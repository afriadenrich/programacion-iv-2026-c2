import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import type { Request } from 'express';

@Controller('app') // /app
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('page') page: string): string {
    // const { page } = req.query;
    return page;
  }

  @Post('/')
  @HttpCode(204)
  post(@Req() req: Request) {
    return { mensaje: 'POST' };
  }

  @Post('otro') // /app/otro
  postOtraCosa() {
    return { mensaje: 'OTRO POST' };
  }

  @Put(':id')
  put(@Param('id') id: string) {
    return { mensaje: 'PUT: ' + id };
  }

  @Delete()
  delete() {
    return { mensaje: 'DELETE' };
  }
}
