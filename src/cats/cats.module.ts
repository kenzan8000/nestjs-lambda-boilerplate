import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import * as mysql from 'mysql2';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    TypeOrmModule.forFeature([/*Cats*/]),
    RateLimiterModule.register({
      for: 'Fastify',
      type: 'MySQL',
      storeClient: mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
      dbName: process.env.DB_NAME,
      tableName: 'ratelimit',
    })
  ]
})
export class CatsModule {}
