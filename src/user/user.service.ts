import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTOInterface, UserInterface } from './user.interface';

@Injectable()
export class UserService {
  private users = [
    { login: 'Roma', password: 'Password123', version: 1 },
    { login: 'Yaroslav', password: 'Password456', version: 1 },
  ].map((user: UserDTOInterface) => new User(user));

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  createUser(userDTO: UserDTOInterface): UserInterface {
    const user = new User(userDTO);
    this.users.push(user);
    return user;
  }
}
