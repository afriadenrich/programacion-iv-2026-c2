import { Component } from '@angular/core';
import { IUsuario } from '../../interfaces/usuario';
import { ListarUsr } from './listar-usr/listar-usr';
import { CrearUsr } from './crear-usr/crear-usr';

@Component({
  imports: [ListarUsr, CrearUsr],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  usuarios: IUsuario[] = [];

  agrear(usuario: IUsuario) {
    this.usuarios = [...this.usuarios, usuario];
  }

  eliminar(i: number) {
    const aux = this.usuarios;
    aux.splice(i, 1);
    this.usuarios = aux;
  }
}
