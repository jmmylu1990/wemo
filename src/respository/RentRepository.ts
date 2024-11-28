import { Injectable } from '@nestjs/common';
import { Rent } from '../entity/Rent';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RentRepository {
  constructor(
    @InjectRepository(Rent)
    private readonly repository: Repository<Rent>,
  ) {}

  addRent(
    userId: number,
    scooterId: number,
    isActive: boolean,
    totalPrice: number,
  ) {
    const rent = this.repository.create({
      userId,
      scooterId,
      isActive,
      totalPrice,
    });

    // 保存到資料庫
    return this.repository.save(rent);
  }
}
