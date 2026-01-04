import { UserRepository } from 'src/domain/user/repositories/UserRepository';
import { User } from 'src/domain/user/entities/User';
import { CreateUserDto } from '../dto/CreateUser.dto';

/**
 * Use-case to create user
 *
 * @export
 * @class CreateUserUseCase
 */
export class CreateUserUseCase {
  /**
   * Creates an instance of CreateUserUseCase.
   * @param {UserRepository} userRepository
   * @memberof CreateUserUseCase
   */
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Creates user from given username, password and email
   *
   * @param {CreateUserDto} userData - user data
   * @return
   * `number` - ID of created user
   * `-1` - user with the same unique fields already exists
   * `null` - unexpected error occurred
   * @memberof CreateUserUseCase
   */
  async execute(userData: CreateUserDto): Promise<number | null> {
    const exists =
      (await this.userRepository.findByUsername(userData.username)) ||
      (await this.userRepository.findByUsername(userData.email));
    if (exists) {
      return -1; // User with the same username already exists
    }

    const user = new User(userData.username, userData.password, userData.email);
    await this.userRepository.create(user);

    return user.id || null;
  }
}
