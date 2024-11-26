import { Controller, Get, Patch, Query, Body, Headers } from '@nestjs/common';
import { ScooterService } from '../service/ScooterService';
import { Scooter } from '../entity/Scooter';
import { UpdateScooterStatusDTO } from '../model/UpdateScooterStatusDTO';

@Controller('scooters/api')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get('nearby')
  async findNearbyScooters(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<Scooter[]> {
    return this.scooterService.findScootersNearby(latitude, longitude);
  }
}
