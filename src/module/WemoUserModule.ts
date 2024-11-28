import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { WemoUserRepository } from '../respository/WemoUserRepository';
import { WemoUserService } from '../service/WemoUserService';
import { WemoUserController } from '../controller/WemoUserController';
import { ScooterModule } from './ScooterModule';
import { KycService } from '../service/KycService';
import { RentModule } from './RentModule';

@Module({
  imports: [TypeOrmModule.forFeature([WemoUser]), ScooterModule, RentModule],
  providers: [WemoUserRepository, WemoUserService, KycService],
  controllers: [WemoUserController],
  exports: [WemoUserService],
})
export class WemoUserModule {}
