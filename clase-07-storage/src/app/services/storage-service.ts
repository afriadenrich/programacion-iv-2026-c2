import { inject, Service } from '@angular/core';
import { SupabaseService } from './supabase';
import { environment } from '../../environments/environment';

@Service()
export class StorageService {
  sup = inject(SupabaseService);

  /**
   * Función para subir un archivo
   * @param file archivo a subir
   * @returns string de la URL subida o null si hubo error
   */
  async subirArchivo(file: File): Promise<string | null> {
    // El date.now puede producir que se creen imagenes con el mismo nombre y se sobreescriban
    const ruta = `perfil/${Date.now()}.${file.type.split('/')[1]}`;
    const { data, error } = await this.sup.Stg.from('imagenes').upload(ruta, file);

    if (!error) {
      // https://xiklpphcyvewicfdjoof.supabase.co/storage/v1/object/public/imagenes/perfil/01.png
      return `ruta`;
    }

    return null;

    // this.sup.Stg.from("imagenes").getPublicUrl("perfil/158.png")
  }
}
