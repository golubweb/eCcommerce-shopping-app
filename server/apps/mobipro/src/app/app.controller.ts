import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService }    from './app.service';
import { AuthGuardUser } from './authorization/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuardUser)
  getData(@Req() _request) {
    return { message: 'Accessed Resource', userId: _request.id };
  }
}
