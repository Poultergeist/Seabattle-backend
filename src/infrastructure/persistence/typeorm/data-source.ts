import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from './entities/UserOrmEntity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [UserOrmEntity],
  synchronize: true,
  logging: false,
});
