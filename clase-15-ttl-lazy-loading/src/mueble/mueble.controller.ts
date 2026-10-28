import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MuebleService } from './mueble.service.js';
import { CreateMuebleDto } from './dto/create-mueble.dto.js';
import { UpdateMuebleDto } from './dto/update-mueble.dto.js';

@Controller('mueble')
export class MuebleController {
  constructor(private readonly muebleService: MuebleService) {}

  @Post()
  create(@Body() createMuebleDto: CreateMuebleDto) {
    return this.muebleService.create(createMuebleDto);
  }

  @Get()
  findAll() {
    return this.muebleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.muebleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuebleDto: UpdateMuebleDto) {
    return this.muebleService.update(+id, updateMuebleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muebleService.remove(+id);
  }
}
