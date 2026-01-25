import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmPrersistenceModule } from 'src/infrastructure/persistence/typeorm/typeorm.module';
import { AuthUtilsModule } from 'src/common/auth/auth-utils.module';
@Module({
  imports: [TypeOrmPrersistenceModule, AuthUtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
