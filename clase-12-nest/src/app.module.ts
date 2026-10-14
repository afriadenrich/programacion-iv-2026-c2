import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';

// Estructura lógica la cuál va a *AGRUPAR* otras estrutcutas lógicas

@Module({
  imports: [UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
