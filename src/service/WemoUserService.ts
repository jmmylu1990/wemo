import { WemoUserRepository } from '../respository/WemoUserRepository';
import { Injectable } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
import { BadRequestException } from '@nestjs/common';
import { KycService } from './KycService';
import { ScooterService } from './ScooterService';
import { DataSource, QueryRunner } from 'typeorm';
import { ResponseDTO } from '../model/ResponseDTO';
import { RentService } from './RentService';
import { AddRentDTO } from '../model/AddRentDTO';
@Injectable()
export class WemoUserService<T> {
  constructor(
    private readonly wemoUserRepository: WemoUserRepository,
    private readonly kycService: KycService,
    private readonly scooterService: ScooterService,
    private readonly rentService: RentService,
    private readonly dataSource: DataSource,
  ) {}

  //註冊
  public async registerUser(user: WemoUser): Promise<WemoUser> {
    const existingUser = await this.wemoUserRepository.findByIdCardNumber(
      user.id_card_number,
    );
    if (existingUser) {
      throw new BadRequestException({
        message: '會員已註冊',
        existingUser, // 返回已註冊會員的資料
      });
    }

    const isLicenseValid = await this.kycService.verifyDriversLicense(
      user.id_card_number,
    );

    if (!isLicenseValid) {
      throw new BadRequestException({
        message: '駕照驗證失敗，查無此身份的駕照',
      });
    }

    const newUser = this.wemoUserRepository.create(user);
    const save = await this.wemoUserRepository.save(newUser);
    return save;
  }

  //租車
  public async rentScooter(
    scooterId: number,
    status: number,
    userId: number,
  ): Promise<ResponseDTO<T>> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //一人只能租一輛車
      const nonRenting = await this.wemoUserRepository.updateIsRenting(
        userId,
        true,
      );
      if (!nonRenting) {
        return ResponseDTO.error(
          `您當前處於已租用其他車輛的狀態 (用戶ID: ${userId})`,
          null,
        );
      }

      //租借該車輛
      const rented = await this.scooterService.rentScooter(
        scooterId,
        status,
        userId,
      );
      if (!rented) {
        return ResponseDTO.error(
          `該車輛當前處於不可用狀態或已被租用 (車輛ID: ${scooterId})`,
          null,
        );
      }

      const addRentDTO = new AddRentDTO(userId, scooterId, true, 0);
      console.log('addRentDTO:', JSON.stringify(addRentDTO, null, 2));
      //在Rent產生租借資料
      await this.rentService.addRent(addRentDTO);
      await queryRunner.commitTransaction();
      return ResponseDTO.success('租借成功', null);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return ResponseDTO.error('租借失敗', null);
    } finally {
      await queryRunner.release();
    }
  }
}
