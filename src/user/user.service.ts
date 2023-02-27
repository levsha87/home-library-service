import { Injectable } from '@nestjs/common';
import * as bcript from 'bcrypt';
import {
  CreateUserDTOInterface,
  UpdatePasswordDtoInterface,
} from './user.interface';
import { throwError403, throwError404, validateUUID } from '../helpers';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany();
    users.map((user) => {
      const { password, ...userRes } = user;
      return userRes;
    });

    return users;
  }

  async getUserById(id: string) {
    validateUUID(id);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throwError404('User not found');

    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        login,
      },
    });

    return user;
  }

  async createUser(userDTO: CreateUserDTOInterface) {
    userDTO.password = await this.hashPassword(userDTO.password);
    const createUser = await this.prismaService.user.create({
      data: {
        login: userDTO.login,
        password: userDTO.password,
        version: 1,
      },
    });

    const { password, ...responseUser } = createUser;
    const responseUserConverted = {
      ...responseUser,
      createdAt: +responseUser.createdAt,
      updatedAt: +responseUser.updatedAt,
    };

    return responseUserConverted;
  }

  async updateUserPassword(
    passwordDto: UpdatePasswordDtoInterface,
    id: string,
  ) {
    validateUUID(id);
    const currentUser = await this.getUserById(id);

    if (
      await this.validatePassword(passwordDto.oldPassword, currentUser.password)
    ) {
      passwordDto.newPassword = await this.hashPassword(
        passwordDto.newPassword,
      );

      const updateUsers = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          password: passwordDto.newPassword,
          version: {
            increment: 1,
          },
          updatedAt: new Date(),
        },
      });

      const { password, ...responseUser } = updateUsers;
      const responseUserConverted = {
        ...responseUser,
        createdAt: +responseUser.createdAt,
        updatedAt: +responseUser.updatedAt,
      };

      return responseUserConverted;
    }

    throwError403('Old password is wrong');
  }

  async removeUser(id: string) {
    validateUUID(id);
    const currentUser = await this.getUserById(id);
    if (currentUser) {
      await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcript.hash(password, +process.env.CRYPT_SALT);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcript.compare(password, hashedPassword);
  }
}
