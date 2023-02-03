import { Body, Controller, Get, Post, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface, UserDTOInterface } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getUsers(): UserInterface[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string): UserInterface {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body('user') user: UserDTOInterface): UserInterface {
    return this.userService.createUser(user);
  }
}
