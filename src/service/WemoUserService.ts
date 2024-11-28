import { WemoUserRepository } from '../respository/WemoUserRepository';
import { Injectable } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
import { BadRequestException } from '@nestjs/common';
import { KycService } from './KycService';
import { ScooterService } from './ScooterService';
import { DataSource, QueryRunner } from 'typeorm';
import { ResponseDTO } from '../model/ResponseDto';
@Injectable()
export class WemoUserService {
  constructor(
    private readonly wemoUserRepository: WemoUserRepository,
    private readonly kycService: KycService,
    private readonly scooterService: ScooterService,
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
  ): Promise<ResponseDTO> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const rented = await this.scooterService.rentScooter(
      scooterId,
      status,
      userId,
    );
    try {
      if (!rented) {
        throw new BadRequestException({
          message: false,
          reason: '該車輛當前處於不可用狀態或已被租用',
          scooterId: scooterId,
        });
      }
      await queryRunner.commitTransaction();
      return new ResponseDTO(true, '租借成功', scooterId);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return new ResponseDTO(false, '租用失敗', scooterId);
    } finally {
      await queryRunner.release();
    }
  }
}
