import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from './entities/UserOrmEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserOrmEntity],
  synchronize: true,
  logging: false,
});
