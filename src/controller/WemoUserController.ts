import { Body, Controller, Patch, Headers } from '@nestjs/common';
import { WemoUserService } from '../service/WemoUserService';
import { Post } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
import { UpdateScooterStatusDTO } from '../model/UpdateScooterStatusDTO';

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

  @Patch('rentScooter')
  async rentScooter(
    @Body() updateScooterStatusDTO: UpdateScooterStatusDTO,
    @Headers('user-id') userId: number,
  ): Promise<boolean> {
    const { scooterId, status } = updateScooterStatusDTO;
    this.wemoUserService.rentScooter(scooterId, status, userId);
    return true;
  }
}
