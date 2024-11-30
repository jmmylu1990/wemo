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

  findByIdCardNumber(idCardNumber: string): Promise<WemoUser | null> {
    return this.repository.findOne({
      where: { id_card_number: idCardNumber },
    });
  }

  //建立有資料的實體，尚未輸入DB
  create(user: WemoUser): WemoUser {
    return this.repository.create(user);
  }

  //直接輸入DB
  save(user: WemoUser): Promise<WemoUser> {
    return this.repository.save(user);
  }

  async updateIsRenting(userId: number, isRenting: boolean): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder()
      .update(WemoUser)
      .set({ is_renting: isRenting })
      .where('id = :userId', { userId })
      .andWhere('is_renting = false') // 添加條件，只有當 is_renting 為 false 時才更新
      .execute();
    // 手動檢查受影響行數，如果 TypeORM 返回正確的結果
    return ((result as any).affected || 0) > 0; // 如果無法直接訪問，通過類型轉換訪問
  }
}
