import { inject, model, Service } from '@angular/core';
import { Supabase } from './supabase';
import Auto, { AutoPorCrear, AutoPorModificar } from '../interfaces/Auto';

@Service()
export class Db {
  supS = inject(Supabase);

  tablaAutos = this.supS.Sup.from('Autos');

  canalAutos = this.supS.Sup.channel('table-db-changes');

  async findAll() {
    const { data, error } = await this.tablaAutos.select('*');

    return data as Auto[];
  }

  async create(auto: AutoPorCrear) {
    const { data, error } = await this.tablaAutos.insert(auto);
  }
}
