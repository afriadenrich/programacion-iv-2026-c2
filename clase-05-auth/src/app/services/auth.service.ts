import { inject, Service, signal, WritableSignal } from '@angular/core';
import IUsuario from '../interfaces/Usuario';
import { Supabase } from './supabase.service';
import { User } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Service()
export class Auth {
  private supabaseS = inject(Supabase);
  private routerS = inject(Router);

  public usuarioActual: WritableSignal<User | null> = signal<User | null>(null);

  constructor() {
    this.supabaseS.Supabase.auth.getSession().then((data) => {
      this.usuarioActual.set(data.data.session?.user || null);
    });
  }

  public async registrar(usuario: IUsuario) {
    const respuesta = await this.supabaseS.Supabase.auth.signUp({
      email: usuario.email,
      password: usuario.password,
      options: {
        data: {
          nombre: usuario.nombre,
          //   fechaDeNacimiento,
          //   nombreDeLaMascota,
          //   etc
        },
      },
    });

    console.log(respuesta);

    // if (!respuesta.error && respuesta.data) {
    //   this.usuarioActual.set(respuesta.data.user);
    //   this.routerS.navigateByUrl('/home');
    // }
  }

  async loguear(usuario: IUsuario) {
    const { data, error } = await this.supabaseS.Supabase.auth.signInWithPassword({
      email: usuario.email,
      password: usuario.password,
    });

    console.log(data, error);

    // if (!error && data) {
    //   this.usuarioActual.set(data.user);
    //   this.routerS.navigateByUrl('/home');
    // }
  }

  async cerrarSesion() {
    const { error } = await this.supabaseS.Supabase.auth.signOut();

    // this.usuarioActual.set(null);
    // this.routerS.navigateByUrl('/auth/login');
  }
}
