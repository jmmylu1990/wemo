import { Controller, Get, Query } from '@nestjs/common';
import { ScooterService } from '../service/ScooterService';
import { Scooter } from '../entity/Scooter';

@Controller('scooters/api')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get('nearby')
  async findNearbyScooters(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('status') status: number,
    @Query('radius') redius: number,
  ): Promise<Scooter[]> {
    return this.scooterService.findScootersNearby(
      latitude,
      longitude,
      status,
      redius,
    );
  }
}
