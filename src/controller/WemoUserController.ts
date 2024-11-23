import { Body, Controller } from '@nestjs/common';
import { WemoUserService } from '../service/WemoUserService';
import { Get, Post } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
@Controller('/users/api')
export class WemoUserController {
  constructor(private readonly wemoUserService: WemoUserService) {}

  @Get('all')
  async findAll(): Promise<WemoUser[]> {
    return await this.wemoUserService.findAll();
  }

  @Post('register')
  async createUser(@Body() userData: Partial<WemoUser>): Promise<WemoUser> {
    return await this.wemoUserService.createUser(userData);
  }
}
