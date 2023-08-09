import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { validateOrReject } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({ usernameField: 'id', passwordField: 'password' });
  }

  // Валидируем обращение к серверу
  async validate(id: string, password: string): Promise<any> {
    // Валидируем данные
    // (не уверен на счет этого рещения, не хотелось использовать валидатор в контроллере)
    // так как появится неиспользуемая переманная (альтернативное решение @Body() payload: SignInDto)
    await validateOrReject(
      plainToClassFromExist(new SignInDto(), { id, password }),
    ).catch((reason) =>
      Promise.reject(new HttpException({ error_message: reason }, 400)),
    );

    // Ищем пользователя по id
    const user = await this.userService.getByUserId(id);

    // Проверяем пароль
    if (user?.password !== this.authService.createHash(password)) {
      // Если пароль не совпадает, то выбрасываем ошибку
      throw new HttpException({ error_message: 'Bad id or password' }, 401);
    }

    // Возвращаем пользователя в request.user
    return user;
  }
}
