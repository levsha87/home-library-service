import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDTOInterface,
  UserInterface,
  UpdatePasswordDtoInterface,
  UserResponseInterface,
} from './user.interface';
import { validateUUID, throwError403, throwError404 } from '../helpers';

@Injectable()
export class UserService {
  private users = [];

  getUsers(): UserInterface[] {
    const users = this.users.map((user) => {
      const { password, ...userRes } = user;
      return userRes;
    });

    return users;
  }

  getUserById(id: string): UserResponseInterface {
    const user = getFullUserById(id, this.users);

    const { password, ...responseUser } = user;
    return responseUser;
  }

  createUser(userDTO: CreateUserDTOInterface): UserResponseInterface {
    const user = new User(userDTO);
    this.users.push(user);
    const { password, ...responseUser } = user;
    return responseUser;
  }

  updateUserPassword(
    passwordDto: UpdatePasswordDtoInterface,
    id: string,
  ): UserResponseInterface {
    const currentUser = getFullUserById(id, this.users);

    if (currentUser.password === passwordDto.oldPassword) {
      currentUser.password = passwordDto.newPassword;
      currentUser.updatedAt = new Date().getTime();
      currentUser.version += 1;
      const { password, ...responseUser } = currentUser;
      return responseUser;
    }

    throwError403('Old password is wrong');
  }

  removeUser(id: string): void {
    const currentUser = getFullUserById(id, this.users);
    const index = this.users.findIndex((user) => user.id === currentUser.id);
    this.users.splice(index, 1);
  }
}

function getFullUserById(id: string, users: UserInterface[]): UserInterface {
  validateUUID(id);
  const user = users.find((user) => user.id === id);
  if (!user) throwError404('User not found');
  return user;
}
