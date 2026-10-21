import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DibujoService } from './dibujo.service.js';
import { CreateDibujoDto } from './dto/create-dibujo.dto.js';
import { UpdateDibujoDto } from './dto/update-dibujo.dto.js';
import { TokenGuard } from '../auth/token/token.guard.js';

@Controller('dibujo')
@UseGuards(TokenGuard)
export class DibujoController {
  constructor(private readonly dibujoService: DibujoService) {}

  @Post()
  create(@Body() createDibujoDto: CreateDibujoDto) {
    return this.dibujoService.create(createDibujoDto);
  }

  @Get()
  findAll() {
    return this.dibujoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dibujoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDibujoDto: UpdateDibujoDto) {
    return this.dibujoService.update(+id, updateDibujoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dibujoService.remove(+id);
  }
}
