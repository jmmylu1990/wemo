import { WemoUserRepository } from '../respository/WemoUserRepository';
import { Injectable } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
@Injectable()
export class WemoUserService {
  constructor(private readonly wemoUserRepository: WemoUserRepository) {}

  // 查询所有用户
  findAll(): Promise<WemoUser[]> {
    return this.wemoUserRepository.findAll();
  }

  // 查找特定用户
  findByUsername(username: string): Promise<WemoUser | null> {
    return this.wemoUserRepository.findByUsername(username);
  }

  // 更新用户状态
  async updateUserStatus(ids: number[], status: boolean): Promise<void> {
    await this.wemoUserRepository.updateUserStatus(ids, status);
  }
}
