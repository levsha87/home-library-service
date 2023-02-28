import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { throwError403, throwError404 } from 'src/helpers';
import { TokenService } from 'src/token/token.service';
import { AuthUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(userDTO: AuthUserDTO) {
    const existUser = await this.userService.getUserByLogin(userDTO.login);

    if (existUser) throwError404('User exist');

    return await this.userService.createUser(userDTO);
  }

  async loginUser(userDto: AuthUserDTO) {
    const existUser = await this.userService.getUserByLogin(userDto.login);

    if (!existUser) throwError403('User not founded');
    const validatePassword = await this.userService.validatePassword(
      userDto.password,
      existUser.password,
    );

    if (!validatePassword) throwError403('Wrong data');

    return this.tokenService.generateJwtToken(existUser);
  }
}
