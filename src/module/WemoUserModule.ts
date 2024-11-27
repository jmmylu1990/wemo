import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { WemoUserRepository } from '../respository/WemoUserRepository';
import { WemoUserService } from '../service/WemoUserService';
import { WemoUserController } from '../controller/WemoUserController';
import { KycService } from '../service/KycService';
import { ScooterMoudl } from './ScooterModule';

@Module({
  imports: [TypeOrmModule.forFeature([WemoUser]), ScooterMoudl],
  providers: [WemoUserRepository, WemoUserService, KycService],
  controllers: [WemoUserController],
  exports: [WemoUserService], // 確保導出 WemoUserRepository 和 WemoUserService
})
export class WemoUserModule {}
