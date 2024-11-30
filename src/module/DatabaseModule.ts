import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WemoUser } from '../entity/WemoUser';
import { Scooter } from '../entity/Scooter';
import { Rent } from '../entity/Rent';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345',
      database: 'postgres',
      entities: [WemoUser, Scooter, Rent],
      synchronize: false,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
