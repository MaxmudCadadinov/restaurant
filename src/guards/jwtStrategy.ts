import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Берём токен из заголовка Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET as string, // ⚠️ лучше вынести в .env
    });
  }

  async validate(payload: any) {
    // payload — это то, что ты зашил в токен при логине
    //console.log('JWT payload перед validate:', payload);
    //console.log(payload)
    return payload;
  }
}

// JWT payload перед validate: { id: 3, role_id: 1, iat: 1755779934, exp: 1755780834 }