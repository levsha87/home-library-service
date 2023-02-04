import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserInterface,
  CreateUserDTOInterface,
  UpdatePasswordDto,
} from './user.interface';

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
  createUser(@Body() user: CreateUserDTOInterface): UserInterface {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  updateUserPassword(
    @Param('id') id: string,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(passwordDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
