import { Module } from '@nestjs/common';
import { RentRepository } from '../respository/RentRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from '../entity/Rent';
import { RentService } from '../service/RentService';
@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  providers: [RentRepository, RentService],
  exports: [RentService],
})
export class RentModule {}
