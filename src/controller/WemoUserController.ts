import { Body, Controller } from '@nestjs/common';
import { WemoUserService } from '../service/WemoUserService';
import { Post } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';

@Controller('/users/api')
export class WemoUserController {
  constructor(private readonly wemoUserService: WemoUserService) {}

  @Post('register')
  async createUser(
    @Body() user: WemoUser,
  ): Promise<WemoUser | { message: string; existingUser: WemoUser }> {
    console.log(user);
    return await this.wemoUserService.registerUser(user);
  }
}
