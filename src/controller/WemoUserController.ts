import { Body, Controller, Patch, Headers } from '@nestjs/common';
import { WemoUserService } from '../service/WemoUserService';
import { Post } from '@nestjs/common';
import { WemoUser } from '../entity/WemoUser';
import { UpdateScooterStatusDTO } from '../model/UpdateScooterStatusDTO';
import { ResponseDTO } from '../model/ResponseDto';

@Controller('/users/api')
export class WemoUserController {
  constructor(private readonly wemoUserService: WemoUserService) {}

  @Post('register')
  async register(
    @Body() user: WemoUser,
  ): Promise<WemoUser | { message: string; existingUser: WemoUser }> {
    return await this.wemoUserService.registerUser(user);
  }

  @Patch('rentScooter')
  async rentScooter(
    @Body() updateScooterStatusDTO: UpdateScooterStatusDTO,
    @Headers('user-id') userId: number,
  ): Promise<ResponseDTO> {
    const { scooterId, status } = updateScooterStatusDTO;
    return await this.wemoUserService.rentScooter(scooterId, status, userId);
  }
}
