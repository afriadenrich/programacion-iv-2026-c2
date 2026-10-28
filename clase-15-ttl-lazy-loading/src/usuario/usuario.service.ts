import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { LazyModuleLoader } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class UsuarioService {
  constructor(
    private lazyModuleLoader: LazyModuleLoader,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    const { ProductoModule } = await import('../producto/producto.module.js');

    const moduloCargado = await this.lazyModuleLoader.load(
      () => ProductoModule,
    );

    const { ProductoService } = await import('../producto/producto.service.js');
    const servicioCargado = moduloCargado.get(ProductoService);

    servicioCargado.algo();

    const usuariosGuardados = await this.cacheManager.get('usuarios');
    if (usuariosGuardados) {
      return usuariosGuardados;
    } else {
      const usuarios = [
        { nombre: 'agus' },
        { nombre: 'Nat' },
        { nombre: 'Daniel' },
      ];
      this.cacheManager.set('usuarios', usuarios);
      return usuarios;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
