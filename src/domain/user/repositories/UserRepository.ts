import { User } from '../entities/User';

/**
 * Provides configuration for Users Repository
 *
 * @export
 * @interface UserRepository
 */
export interface UserRepository {
  /**
   * Creates user by given User data structure
   *
   * @param {User} user
   * @return
   * `number` - new user's id
   * `-1` - user already exists
   * `null` - error while creating user
   * @memberof UserRepository
   */
  create(user: User): Promise<number | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<boolean | null>;
  updateToken(id: number): Promise<string | null>;
}
