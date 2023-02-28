import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(user) {
    const payload = { id: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('jwt_secret_key'),
        expiresIn: this.configService.get('jwt_token_expire_time'),
      }),
    };
  }
}
