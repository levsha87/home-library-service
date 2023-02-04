import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDTOInterface,
  UserInterface,
  userDTOKeys,
  UpdatePasswordDto,
  passwordDTOKeys,
  UserResponseInterface,
} from './user.interface';
import {
  validateUUID,
  throwError403,
  throwError404,
  throwError400,
} from '../helpers';

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
    checkUserDTO<CreateUserDTOInterface>(userDTO);
    const user = new User(userDTO);
    this.users.push(user);
    const { password, ...responseUser } = user;
    return responseUser;
  }

  updateUserPassword(
    passwordDto: UpdatePasswordDto,
    id: string,
  ): UserResponseInterface {
    checkPasswordDTO<UpdatePasswordDto>(passwordDto);
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

function checkUserDTO<T>(userDTO: T): void {
  for (const key of userDTOKeys) {
    if (!userDTO[key]) {
      throwError400('User required fields are missing');
    }
  }
}

function checkPasswordDTO<T>(passwordDTO: T): void {
  for (const key of passwordDTOKeys) {
    if (!passwordDTO[key]) {
      throwError400('Password required fields are missing');
    }
  }
}

function getFullUserById(id: string, users: UserInterface[]): UserInterface {
  validateUUID(id);
  const user = users.find((user) => user.id === id);
  if (!user) throwError404('User not found');
  return user;
}
