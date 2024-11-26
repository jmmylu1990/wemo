import { Injectable } from '@nestjs/common';
import { ScooterRepository } from '../respository/ScooterRepository';
import { Scooter } from '../entity/Scooter';
@Injectable()
export class ScooterService {
  constructor(private readonly scooterRepository: ScooterRepository) {}

  async findScootersNearby(
    latitude: number,
    longitude: number,
  ): Promise<Scooter[]> {
    return this.scooterRepository.findScootersNearby(latitude, longitude);
  }

  async updateStatus(
    scooterId: number,
    status: number,
    userId: number,
  ): Promise<boolean> {
    const updateResult = await this.scooterRepository.updateStatus(
      scooterId,
      status,
      userId,
    );
    return updateResult.valueOf();
  }
}
