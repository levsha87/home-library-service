import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDTOInterface,
  UpdatePasswordDtoInterface,
  UserResponseInterface,
} from './user.interface';
import { throwError403, throwError404, validateUUID } from '../helpers';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUsers(): UserResponseInterface[] {
    const users = this.dbService.getUsers().map((user) => {
      const { password, ...userRes } = user;
      return userRes;
    });

    return users;
  }

  getUserById(id: string): UserResponseInterface {
    validateUUID(id);
    const user = this.getUsers().find((user) => user.id === id);
    if (!user) throwError404('User not found');

    return user;
  }

  createUser(userDTO: CreateUserDTOInterface): UserResponseInterface {
    const user = new User(userDTO);
    this.dbService.addUser(user);
    const { password, ...responseUser } = user;
    return responseUser;
  }

  updateUserPassword(
    passwordDto: UpdatePasswordDtoInterface,
    id: string,
  ): UserResponseInterface {
    validateUUID(id);
    const currentUser = this.dbService
      .getUsers()
      .find((user) => user.id === id);

    if (!currentUser) throwError404('User not found');

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
    const currentUser = this.getUserById(id);
    const index = this.getUsers().findIndex(
      (user) => user.id === currentUser.id,
    );
    this.dbService.removeUser(index);
  }
}
