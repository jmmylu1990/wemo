import { Injectable } from '@nestjs/common';
import { ScooterRepository } from '../respository/ScooterRepository';
import { Scooter } from '../entity/Scooter';
@Injectable()
export class ScooterService {
  constructor(private readonly scooterRepository: ScooterRepository) {}

  async findScootersNearby(
    latitude: number,
    longitude: number,
    status: number,
    radius: number,
  ): Promise<Scooter[]> {
    return this.scooterRepository.findScootersNearby(
      latitude,
      longitude,
      status,
      radius,
    );
  }

  async rentScooter(
    scooterId: number,
    status: number,
    userId: number,
  ): Promise<boolean> {
    const updateResult = await this.scooterRepository.rentScooter(
      scooterId,
      status,
      userId,
    );
    return updateResult;
  }

  async getScooterById(scooterId: number): Promise<Scooter | null> {
    return await this.scooterRepository.findOne(scooterId);
  }
}
