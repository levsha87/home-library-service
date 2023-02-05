import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface, UserResponseInterface } from './user.interface';

import { CreateUserDTO, UpdateUserPasswordDTO } from './user.dto';

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
  getUser(@Param('id') id: string): UserResponseInterface {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDTO): UserResponseInterface {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  updateUserPassword(
    @Param('id') id: string,
    @Body() passwordDto: UpdateUserPasswordDTO,
  ) {
    return this.userService.updateUserPassword(passwordDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
