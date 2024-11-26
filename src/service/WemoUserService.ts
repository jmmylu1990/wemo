import { WemoUserRepository } from '../respository/WemoUserRepository';
import { Injectable } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
import { BadRequestException } from '@nestjs/common';
import { KycService } from './KycService';
@Injectable()
export class WemoUserService {
  constructor(
    private readonly wemoUserRepository: WemoUserRepository,
    private readonly kycService: KycService, // 注入 KycService
  ) {}

  async registerUser(user: WemoUser): Promise<WemoUser> {
    // 檢查是否有重複的身份證字號
    const existingUser = await this.wemoUserRepository.findByIdCardNumber(
      user.id_card_number,
    );

    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException({
        message: '會員已註冊',
        existingUser, // 返回已註冊會員的資料
      });
    }

    //驗證身分證是否有駕照
    const isLicenseValid = this.kycService.verifyDriversLicense(
      user.id_card_number,
    );

    if (!isLicenseValid) {
      throw new BadRequestException({
        message: '駕照驗證失敗，查無此身份的駕照',
      });
    }

    // 新會員註冊
    const newUser = this.wemoUserRepository.create(user);
    return this.wemoUserRepository.save(newUser);
  }
}
