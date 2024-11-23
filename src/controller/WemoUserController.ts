import { Controller } from '@nestjs/common';
import { WemoUserService } from '../service/WemoUserService';
import { Get } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
@Controller('/users/api') // 定義路由前綴
export class WemoUserController {
  constructor(private readonly wemoUserService: WemoUserService) {}

  @Get('all') // 定義 GET /users 路由
  async findAll(): Promise<WemoUser[]> {
    return await this.wemoUserService.findAll();
  }
}
