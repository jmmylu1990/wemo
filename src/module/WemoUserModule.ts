import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { WemoUserRepository } from '../respository/WemoUserRepository';
import { WemoUserService } from '../service/WemoUserService';
import { WemoUserController } from '../controller/WemoUserController';
import { ScooterModule } from './ScooterModule';
import { KycService } from '../service/KycService';

@Module({
  imports: [TypeOrmModule.forFeature([WemoUser]), ScooterModule],
  providers: [WemoUserRepository, WemoUserService, KycService],
  controllers: [WemoUserController],
  exports: [WemoUserService],
})
export class WemoUserModule {}
