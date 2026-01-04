import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/UserOrmEntity';
import { UserTypeOrmRepository } from './repositories/UserTypeOrmRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
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
