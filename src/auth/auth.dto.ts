import { IsNotEmpty, IsString } from 'class-validator';

interface AuthUserDTOInterface {
  login: string;
  password: string;
}

export class AuthUserDTO implements AuthUserDTOInterface {
  @IsNotEmpty({ message: 'The user should have a login' })
  @IsString({ message: 'Login should be string' })
  login: string;

  @IsNotEmpty({ message: 'The user should have a password' })
  @IsString({ message: 'Login should be string' })
  password: string;
}
