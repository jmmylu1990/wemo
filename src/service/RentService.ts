import { Rent } from '../entity/Rent';
import { Injectable } from '@nestjs/common';
import { RentRepository } from '../respository/RentRepository';
import { AddRentDTO } from '../model/AddRentDTO';

@Injectable()
export class RentService {
  constructor(private readonly repository: RentRepository) {}

  async addRent(addRentDTO: AddRentDTO): Promise<Rent> {
    return this.repository.addRent(
      addRentDTO.userId,
      addRentDTO.scooterId,
      addRentDTO.isActive,
      addRentDTO.totalPrice,
    );
  }
}
