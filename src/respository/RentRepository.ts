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
  ): Promise<Rent> {
    {
      const rent = this.repository.create({
        userId,
        scooterId,
        isActive,
        totalPrice,
      });
      return this.repository.save(rent);
    }
  }
}
