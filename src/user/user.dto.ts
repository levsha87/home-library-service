import { IsNotEmpty } from 'class-validator';
import {
  CreateUserDTOInterface,
  UpdatePasswordDtoInterface,
} from './user.interface';

export class CreateUserDTO implements CreateUserDTOInterface {
  @IsNotEmpty({ message: 'The user should have a login' })
  login: string;

  @IsNotEmpty({ message: 'The user should have a password' })
  password: string;
}

export class UpdateUserPasswordDTO implements UpdatePasswordDtoInterface {
  @IsNotEmpty({ message: 'The old password is missing' })
  oldPassword: string;

  @IsNotEmpty({ message: 'The new password is missing' })
  newPassword: string;
}
