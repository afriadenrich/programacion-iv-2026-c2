import { inject, Service } from '@angular/core';
import { Supabase } from './supabase.service';
import Auto, { AutoPorCrear, AutoPorModificar } from '../interfaces/Auto';

@Service()
export class DbService {
  private supS = inject(Supabase);

  tablaAutos = this.supS.Supabase.from('Autos');

  async findAll() {
    const { data, error } = await this.tablaAutos.select('*');

    return data as Auto[];
  }

  async findById(id: number) {
    const { data, error } = await this.tablaAutos.select('*').eq('id', id).single();

    return data as Auto;
  }

  async create(auto: AutoPorCrear) {
    const { data, error } = await this.tablaAutos.insert(auto);
  }

  async update(auto: AutoPorModificar) {
    const { data, error } = await this.tablaAutos
      .update({
        marca: auto.marca,
        modelo: auto.modelo,
        precio: auto.precio,
      })
      .eq('id', auto.id);
  }

  async delete(id: number) {
    const { data, error } = await this.tablaAutos.delete().eq('id', id);
  }
}
