import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as crypto from 'node:crypto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: SignUpDto) {
    // Хешируем пароль
    const password = this.createHash(payload.password);

    // Создаем нового пользователя
    const user = await this.userService.create(password);

    // Создаем токен
    const accessToken = await this.createAccessToken(user);

    // Возвращаем пользователя и токен
    return {
      id: user._id,
      token: accessToken,
    };
  }

  async signIn(user: UserDocument) {
    // Создаем токен
    const token = await this.createAccessToken(user);

    // Возвращаем пользователю токен
    return {
      token,
    };
  }

  async createAccessToken(user: UserDocument) {
    return this.jwtService.signAsync({ id: user._id });
  }

  // Хешируем строку
  createHash(str: string) {
    return crypto.createHmac('sha256', str).digest('hex');
  }
}
