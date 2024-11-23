import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { WemoUserRepository } from '../respository/WemoUserRepository';
import { WemoUserService } from '../service/WemoUserService';
import { WemoUserController } from '../controller/WemoUserController';

@Module({
  imports: [TypeOrmModule.forFeature([WemoUser])],
  providers: [WemoUserRepository, WemoUserService],
  controllers: [WemoUserController],
  exports: [WemoUserRepository, WemoUserService], // 確保導出 WemoUserRepository 和 WemoUserService
})
export class WemoUserModule {}
