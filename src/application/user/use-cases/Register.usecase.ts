import { UserRepository } from 'src/domain/user/repositories/UserRepository';
import { RegisterDto } from '../dto/Register.dto';
import { User } from 'src/domain/user/entities/User';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';
import { HashService } from 'src/common/auth/hash.service';
/**
 * Use-case to register user
 *
 * @export
 * @class RegisterUseCase
 */
export class RegisterUseCase {
  /**
   * Creates an instance of RegisterUseCase.
   * @param {UserRepository} repo
   * @memberof RegisterUseCase
   */
  constructor(
    private readonly repo: UserRepository,
    private readonly hash: HashService,
  ) {}

  /**
   * Registers the user if not exists
   *
   * @param {RegisterDto} userData - user data
   * @return
   * `string` - token of created user
   * `null` - user with the same unique fields already exists or unexpected error occurred
   * @memberof RegisterUseCase
   */
  async execute(userData: RegisterDto): Promise<string | null> {
    const exists =
      (await this.repo.findByUsername(userData.username)) ||
      (await this.repo.findByUsername(userData.email));

    if (exists) {
      return AUTH_ERRORS.already_exists; // User with the same username or email already exists
    }

    const user = new User(
      userData.username,
      await this.hash.hash(userData.password),
      userData.email,
    );
    const userId = await this.repo.create(user);

    if (!userId) {
      return null;
    }

    return await this.repo.updateToken(userId);
  }
}
