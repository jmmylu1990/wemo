import { Module } from '@nestjs/common';

import { WemoUserModule } from './module/WemoUserModule';
import { DatabaseModule } from './module/DatabaseModule';
import { ScooterModule } from './module/ScooterModule';
import { RentModule } from './module/RentModule';

@Module({
  imports: [DatabaseModule, WemoUserModule, ScooterModule, RentModule],
})
export class AppModule {}
