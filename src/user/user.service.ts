import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDTOInterface,
  UserInterface,
  userDTOKeys,
  UpdatePasswordDto,
} from './user.interface';
import {
  validateUUID,
  throwError403,
  throwError404,
  throwError400,
} from '../helpers';

@Injectable()
export class UserService {
  private users = [
    { login: 'Roma', password: 'Password123' },
    { login: 'Yaroslav', password: 'Password456' },
  ].map((user: CreateUserDTOInterface) => new User(user));

  getUsers(): UserInterface[] {
    return this.users;
  }

  getUserById(id: string): UserInterface {
    validateUUID(id);
    const user = this.users.find((user) => user.id === id);
    if (!user) throwError404('User not found');
    return user;
  }

  createUser(userDTO: CreateUserDTOInterface): UserInterface {
    checkUserDTO<CreateUserDTOInterface>(userDTO);
    const user = new User(userDTO);
    this.users.push(user);
    return user;
  }

  updateUserPassword(passwordDto: UpdatePasswordDto, id: string) {
    const currentUser = this.getUserById(id);

    if (currentUser.password === passwordDto.oldPassword) {
      currentUser.password = passwordDto.newPassword;
      currentUser.updatedAt = new Date().getTime();
      return currentUser;
    }

    throwError403('Old password is wrong');
  }

  removeUser(id: string): UserInterface {
    const currentUser = this.getUserById(id);
    const index = this.users.findIndex((user) => user.id === currentUser.id);
    this.users.splice(index, 1);

    return currentUser;
  }
}

function checkUserDTO<T>(userDTO: T): void {
  for (const key of userDTOKeys) {
    if (!userDTO[key]) {
      throwError400('User required fields are login and password');
    }
  }
}
