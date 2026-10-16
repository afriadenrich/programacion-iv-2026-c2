import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MonumentoService } from './monumento.service.js';
import { CreateMonumentoDto } from './dto/create-monumento.dto.js';
import { UpdateMonumentoDto } from './dto/update-monumento.dto.js';

@Controller('monumento')
export class MonumentoController {
  constructor(private monumentoService: MonumentoService) {}

  @Post()
  create(@Body() CreateMonumentoDto: CreateMonumentoDto) {
    return this.monumentoService.create(CreateMonumentoDto);
  }

  @Get()
  findAll() {
    return this.monumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monumentoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateMonumentoDto: UpdateMonumentoDto,
  ) {
    return this.monumentoService.update(id, UpdateMonumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monumentoService.remove(id);
  }
}
