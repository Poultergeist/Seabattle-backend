import { Module, Global } from '@nestjs/common';
import { HashService } from './hash.service';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [HashService, JwtService],
  exports: [HashService, JwtService],
})
export class AuthUtilsModule {}
