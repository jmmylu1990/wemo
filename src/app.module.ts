import { Module } from '@nestjs/common';

import { WemoUserModule } from './module/WemoUserModule';
import { DatabaseModule } from './module/DatabaseModule';
import { ScooterMoudl } from './module/ScooterModule';

@Module({
  imports: [DatabaseModule, WemoUserModule, ScooterMoudl],
})
export class AppModule {}
