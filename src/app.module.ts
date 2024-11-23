import { Module } from '@nestjs/common';

import { WemoUserModule } from './module/WemoUserModule';
import { DatabaseModule } from './module/DatabaseModule';

@Module({
  imports: [DatabaseModule, WemoUserModule],
})
export class AppModule {}
