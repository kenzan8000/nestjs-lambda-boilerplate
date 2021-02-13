import { ConnectionOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from 'path';

const options: TypeOrmModuleOptions & ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  cli: {
    migrationsDir: join(__dirname + '/migrations'),
  },
  entities: [join(__dirname + '/entities/*.entity.{js,ts}')],
  migrations: [join(__dirname + '/migrations/*.{js,ts}')],
  subscribers: [join(__dirname + '/subscribers/*.subscriber.{js,ts}')],
  synchronize: false,
  keepConnectionAlive: true,
};
export = options;