import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/repositories/UserRepository';
import { UserOrmEntity } from '../entities/UserOrmEntity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/User';
import { MissingIdentifierError } from 'src/domain/errors/MissingIdentifierError';
import { JwtService } from 'src/common/auth/jwt.service';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  private readonly auth: JwtService = new JwtService();

  async create(user: User): Promise<number | null> {
    const savedUser = await this.repo.save(this.repo.create(user));
    return savedUser.id;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userOrmEntity = await this.repo.findOne({ where: { username } });
    if (!userOrmEntity) {
      return null;
    }
    return new User(
      userOrmEntity.username,
      userOrmEntity.password,
      userOrmEntity.email,
      userOrmEntity.id,
    );
  }

  async findById(id: number): Promise<User | null> {
    const userOrmEntity = await this.repo.findOne({ where: { id } });
    if (!userOrmEntity) {
      return null;
    }
    return new User(
      userOrmEntity.username,
      userOrmEntity.password,
      userOrmEntity.email,
      userOrmEntity.id,
    );
  }

  async update(user: User): Promise<User> {
    if (!user.id || !user.username) {
      throw new MissingIdentifierError();
    }
    const userOrmEntity = await this.repo.save(this.repo.create(user));
    return new User(
      userOrmEntity.username,
      userOrmEntity.password,
      userOrmEntity.email,
      userOrmEntity.id,
    );
  }

  async delete(id: number): Promise<boolean | null> {
    const userOrmEntity = await this.repo.findOne({ where: { id } });
    if (!userOrmEntity) {
      return false;
    }
    await this.repo.delete(id);
    return true;
  }

  async updateToken(id: number): Promise<string | null> {
    const userOrmEntity = await this.repo.findOne({ where: { id } });
    if (!userOrmEntity) {
      return null;
    }
    const newToken = await this.auth.sign(
      {
        username: userOrmEntity.username,
        email: userOrmEntity.email,
        sub: userOrmEntity.id.toString(),
      },
      process.env.JWT_SECRET || 'default_secret',
      process.env.JWT_EXPIRATION || '15d',
    );
    userOrmEntity.token = newToken;
    await this.repo.save(userOrmEntity);
    return newToken;
  }
}
