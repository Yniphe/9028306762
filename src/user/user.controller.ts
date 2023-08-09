import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestAndUser } from '../types/Request';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  @Get()
  @HttpCode(200)
  async userInfo(@Req() req: RequestAndUser) {
    const { id } = req.user;

    return {
      id,
    };
  }
}
