import { Rent } from '../entity/Rent';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ResponseDTO } from '../model/ResponseDTO';
import { RentRepository } from '../respository/RentRepository';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly repository: RentRepository,
  ) {}

  public addRent() {
    this.repository.addRent(0, 0, true, 0);
    return new ResponseDTO(true, '新增訂單', 0);
  }
}
