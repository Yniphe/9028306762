import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestAndUser } from '../types/Request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() payload: SignUpDto) {
    return this.authService.signUp(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  async signIn(@Req() req: RequestAndUser) {
    return this.authService.signIn(req.user);
  }
}
