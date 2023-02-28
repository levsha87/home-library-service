import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: AuthUserDTO) {
    return await this.authService.loginUser(userDto);
  }

  @Post('signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async register(@Body() userDto: AuthUserDTO) {
    return await this.authService.registerUser(userDto);
  }
}
