import { WemoUserRepository } from '../respository/WemoUserRepository';
import { Injectable } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
@Injectable()
export class WemoUserService {
  constructor(private readonly wemoUserRepository: WemoUserRepository) {}

  findAll(): Promise<WemoUser[]> {
    return this.wemoUserRepository.findAll();
  }

  findByUsername(username: string): Promise<WemoUser | null> {
    return this.wemoUserRepository.findByUsername(username);
  }

  async updateUserStatus(ids: number[], status: boolean): Promise<void> {
    await this.wemoUserRepository.updateUserStatus(ids, status);
  }

  async createUser(userData: Partial<WemoUser>): Promise<WemoUser> {
    return await this.wemoUserRepository.createUser(userData);
  }
}
