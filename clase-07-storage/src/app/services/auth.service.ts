import { inject, Service, signal, WritableSignal } from '@angular/core';
import IUsuario, { ICrearUsuario } from '../interfaces/Usuario';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase';
import confetti from 'canvas-confetti';
import { DbService } from './db.service';

@Service()
export class Auth {
  private supabaseS = inject(SupabaseService);
  private dbS = inject(DbService);
  private routerS = inject(Router);

  public usuarioActual: WritableSignal<User | null> = signal<User | null>(null);

  constructor() {
    this.supabaseS.Auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        confetti({ origin: { y: 1 } }); // borrar cuando me sature
        const usrDB = await this.dbS.obtenerUsuario(session.user.id);

        session.user.user_metadata['foto_portada'] = usrDB.foto_portada;
        session.user.user_metadata['nombre'] = usrDB.nombre;
        this.usuarioActual.set(session.user);
        this.routerS.navigateByUrl('/home');
      } else {
        this.usuarioActual.set(null);
        this.routerS.navigateByUrl('/login');
      }
    });
  }

  public async registrar(usuario: ICrearUsuario, imagenURL: string) {
    const { data, error } = await this.supabaseS.Auth.signUp({
      email: usuario.email,
      password: usuario.password,
      options: {
        data: {
          foto: imagenURL,
          // foto: 'no puedo pasar usuario.foto porque es un file, eso va en el bucket, acá debería guardar la referencia (URL)',
        },
      },
    });

    return { data, error };
  }

  async loguear(usuario: IUsuario) {
    await this.supabaseS.Auth.signInWithPassword({
      email: usuario.email,
      password: usuario.password,
    });
  }

  async cerrarSesion() {
    await this.supabaseS.Auth.signOut();
  }
}
