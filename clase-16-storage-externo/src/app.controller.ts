import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async subirImagen(@UploadedFile() archivo: Express.Multer.File) {
    console.log(archivo);
    return this.appService.subirArchivo(archivo);
  }
}
