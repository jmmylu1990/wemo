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

  //租車
  async rentScooter(
    scooterId: number,
    scooterStatus: number,
    userId: number,
  ): Promise<boolean> {
    const updateResult = await this.scooterRepository
      .createQueryBuilder()
      .update(Scooter)
      .set({
        status: scooterStatus,
        current_renter: userId,
      })
      .where('id = :scooterId AND status = 0', { scooterId })
      .execute();
    return updateResult.affected != 0;
  }

  async findOne(scooterId: number): Promise<Scooter | null> {
    return this.scooterRepository.findOne({
      where: { id: scooterId },
    });
  }
}
