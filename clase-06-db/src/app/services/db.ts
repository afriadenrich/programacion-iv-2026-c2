import { inject, model, Service } from '@angular/core';
import { Supabase } from './supabase';
import Auto, { AutoPorCrear, AutoPorModificar } from '../interfaces/Auto';

@Service()
export class Db {
  supS = inject(Supabase);

  tablaAutos = this.supS.Sup.from('Autos');

  // CRUD
  async findAll() {
    // SELECT *   FROM  Autos
    //            FROM  Autos   SELECT  *
    // this.supS.Sup.from("Autos").select("marca, modelo")
    // const { data, error } = await this.supS.Sup.from('Autos').select('*').eq('marca', 'audi');
    const { data, error } = await this.tablaAutos.select('*');

    console.log(data, error);

    return data as Auto[];
  }

  async findById(id: number) {
    const { data, error } = await this.tablaAutos.select('*').eq('id', id);

    console.log(data, error);
  }

  async create(auto: AutoPorCrear) {
    const { data, error } = await this.tablaAutos.insert(auto);

    console.log(data, error);
  }

  async update(auto: AutoPorModificar) {
    // UPDATE marca, modelo, precio FROM Autos VALUES (marca, modelo, precio) WHERE id = id
    const { data, error } = await this.tablaAutos
      .update({
        marca: auto.marca,
        modelo: auto.modelo,
        precio: auto.precio,
      })
      .eq('id', auto.id);

    console.log(data, error);
  }

  async delete(id: number) {
    const { data, error } = await this.tablaAutos.delete().eq('id', id);

    console.log(data, error);
  }
}
