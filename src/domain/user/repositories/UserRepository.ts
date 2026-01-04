import { User } from '../entities/User';

/**
 * Provides configuration for Users Repository
 *
 * @export
 * @interface UserRepository
 */
export interface UserRepository {
  create(user: User): Promise<number | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<boolean | null>;
  updateToken(id: number): Promise<string | null>;
}
