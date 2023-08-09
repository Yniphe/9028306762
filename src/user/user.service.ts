import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    // Подключаем модель User из модуля UserModule
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * @description Создает нового пользователя
   */
  async create(password: string): Promise<UserDocument> {
    // Создаем нового пользователя
    return this.userModel.create({
      password,
    });
  }

  // Ищем пользователя по id
  async getByUserId(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
}
