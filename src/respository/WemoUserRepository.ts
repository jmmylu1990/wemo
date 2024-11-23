import { InjectRepository } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WemoUserRepository {
  constructor(
    @InjectRepository(WemoUser)
    private readonly repository: Repository<WemoUser>,
  ) {}

  async findAll(): Promise<WemoUser[]> {
    return this.repository.find();
  }

  async findByUsername(username: string): Promise<WemoUser | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async updateUserStatus(ids: number[], status: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(WemoUser)
      .set({ is_verified: status })
      .whereInIds(ids)
      .execute();
  }

  async createUser(userData: Partial<WemoUser>): Promise<WemoUser> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }
}
