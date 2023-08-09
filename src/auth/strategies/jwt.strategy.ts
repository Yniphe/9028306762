import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SessionDto } from '../dto/session.dto';
import { UserService } from '../../user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET_KEY'),
    });
  }

  // Вызывается при успешной валидации токена
  // Проверка на существование пользователя в БД
  async validate(payload: SessionDto) {
    return this.userService.getByUserId(payload.id);
  }
}
