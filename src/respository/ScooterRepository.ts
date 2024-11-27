import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../entity/Scooter';
@Injectable()
export class ScooterRepository {
  constructor(
    @InjectRepository(Scooter)
    private readonly scooterRepository: Repository<Scooter>,
  ) {}

  async findScootersNearby(
    latitude: number,
    longitude: number,
    status: number,
    radius: number,
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
      .andWhere('scooter.status = :status')
      .orderBy('scooter.id', 'ASC') // 單獨指定排序條件
      .setParameters({ latitude, longitude, radius, status })
      .getMany();
  }

  async updateStatus(
    scooterId: number,
    scooterStatus: number,
    userId: number,
  ): Promise<boolean> {
    const updateResult = await this.scooterRepository.update(
      { id: scooterId },
      {
        status: scooterStatus,
        current_renter: userId, // 更新為動態的 `userId`
      },
    );
    return updateResult.affected > 0;
  }
}
