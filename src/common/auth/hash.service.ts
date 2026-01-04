import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password);

      return hash;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error hashing password');
    }
  }

  async verify(password: string, hash: string): Promise<boolean> {
    try {
      const isValid = await argon2.verify(hash, password);

      return isValid;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error verifying password');
    }
  }
}
