import { UserRepository } from 'src/domain/user/repositories/UserRepository';
import { LoginDto } from '../dto/Login.dto';
import { HashService } from 'src/common/auth/hash.service';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';

/**
 * Use-case to login user
 *
 * @export
 * @class LoginUseCase
 */
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pass: HashService,
  ) {}

  /**
   * Logins user
   *
   * @param {LoginDto} loginDto - user login data
   * @return
   * `string` - token of logged in user
   * `null` - user not found or invalid password
   * @memberof LoginUseCase
   */
  async execute(loginDto: LoginDto): Promise<string | null> {
    if (!loginDto || !loginDto.username || !loginDto.password) {
      return AUTH_ERRORS.blank_body;
    }

    const user = await this.userRepository.findByUsername(loginDto.username);
    if (!user || !user.id) {
      return AUTH_ERRORS.user_not_found; // User not found
    }

    if (!(await this.pass.verify(loginDto.password, user.password))) {
      return AUTH_ERRORS.invalid_password; // Invalid password
    }

    return await this.userRepository.updateToken(user.id); // In a real application, return a JWT or session token
  }
}
