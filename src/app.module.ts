import { Module } from '@nestjs/common';

import { WemoUserModule } from './module/WemoUserModule';
import { DatabaseModule } from './module/DatabaseModule';
import { ScooterModule } from './module/ScooterModule';

@Module({
  imports: [DatabaseModule, WemoUserModule, ScooterModule],
})
export class AppModule {}
