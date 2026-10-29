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
  @UseInterceptors(
    FileInterceptor('imagen', { limits: { fileSize: 1024 * 1024 * 2 } }),
  )
  async subirImagen(@UploadedFile() archivo: Express.Multer.File) {
    console.log(archivo);
    return this.appService.subirArchivo(archivo);
  }
}
