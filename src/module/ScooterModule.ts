import { Scooter } from '../entity/Scooter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterService } from '../service/ScooterService';
import { ScooterController } from '../controller/ScooterController';
import { ScooterRepository } from '../respository/ScooterRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  providers: [ScooterRepository, ScooterService],
  controllers: [ScooterController],
  exports: [ScooterService],
})
export class ScooterMoudl {}
