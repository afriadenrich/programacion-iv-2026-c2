import { inject, Service } from '@angular/core';
import { SupabaseService } from './supabase';

@Service()
export class DbService {
  private supS = inject(SupabaseService);

  async crearRegistroUsuario(uuid: string) {
    await this.supS.Sup.from('Usuarios').insert({ id: uuid });
  }

  async modificarUsuario(uuid: string, datos: { nombre: string | null; foto: string | null }) {
    const { data, error } = await this.supS.Sup.from('Usuarios')
      .update({
        nombre: datos.nombre !== null ? datos.nombre : undefined,
        foto_portada: datos.foto !== null ? datos.foto : undefined,
      })
      .eq('id', uuid);

    return { data, error };
  }

  async obtenerUsuario(uuid: string) {
    const { data, error } = await this.supS.Sup.from('Usuarios')
      .select('*')
      .eq('id', uuid)
      .single();

    return data;
  }
}
