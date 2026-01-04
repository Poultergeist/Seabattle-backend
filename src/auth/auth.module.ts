import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmPrersistenceModule } from 'src/infrastructure/persistence/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmPrersistenceModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
