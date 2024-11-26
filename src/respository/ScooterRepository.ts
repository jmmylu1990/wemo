import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../entity/Scooter';

@Injectable()
export class ScooterRepository {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>, // 直接注入 Repository
  ) {}

  async findScootersNearby(
    latitude: number,
    longitude: number,
    radius: number = 500,
  ): Promise<Scooter[]> {
    return this.scooterRepository
      .createQueryBuilder('scooter')
      .where(
        `(
          6371000 * acos(
            cos(radians(:latitude)) * cos(radians(scooter.latitude)) *
            cos(radians(scooter.longitude) - radians(:longitude)) +
            sin(radians(:latitude)) * sin(radians(scooter.latitude))
          )
        ) <= :radius`,
      )
      .setParameters({ latitude, longitude, radius })
      .getMany();
  }
}
