import { IsNotEmpty } from 'class-validator';

interface AuthUserDTOInterface {
  login: string;
  password: string;
}

export class AuthUserDTO implements AuthUserDTOInterface {
  @IsNotEmpty({ message: 'The user should have a login' })
  login: string;

  @IsNotEmpty({ message: 'The user should have a password' })
  password: string;
}
