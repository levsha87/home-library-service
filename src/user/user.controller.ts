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

import { CreateUserDTO, UpdateUserPasswordDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: CreateUserDTO) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @Param('id') id: string,
    @Body() passwordDto: UpdateUserPasswordDTO,
  ) {
    return await this.userService.updateUserPassword(passwordDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }
}
