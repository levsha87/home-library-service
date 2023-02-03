import { UserInterface, UserDTOInterface } from './user.interface';
import { v4 } from 'uuid';

export class User implements UserInterface {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: UserDTOInterface) {
    this.id = v4();
    this.login = user.login;
    this.password = user.password;
    this.version = null;
    this.createdAt = new Date().getTime();
    this.updatedAt = null;
  }
}
