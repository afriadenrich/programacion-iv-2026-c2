export default interface IUsuario {
  email: string;
  password: string;
  foto: string;
}

export interface ICrearUsuario {
  email: string;
  password: string;
  foto: File;
}

export interface UsuarioExtendido {
  portada: string;
  nombre: string;
}
