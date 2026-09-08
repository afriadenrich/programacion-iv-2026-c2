import { inject, Service } from '@angular/core';
import { SupabaseService } from './supabase';

@Service()
export class StorageService {
  sup = inject(SupabaseService);

  async subirArchivo(file: any, ruta: any) {
    const { data, error } = await this.sup.Stg.from('imagenes').upload(ruta, file);

    return { data, error };
  }
}
