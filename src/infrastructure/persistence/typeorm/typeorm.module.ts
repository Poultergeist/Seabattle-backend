import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/UserOrmEntity';
import { UserTypeOrmRepository } from './repositories/UserTypeOrmRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserOrmEntity],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class TypeOrmPrersistenceModule {}
