import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Db } from './services/db';
import Auto, { AutoPorCrear, AutoPorModificar } from './interfaces/Auto';
import { Subscription } from 'rxjs';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  db = inject(Db);

  autos = signal<Auto[]>([]);

  suscripcion?: RealtimeChannel;

  formCrear = new FormGroup({
    marca: new FormControl(''),
    modelo: new FormControl(''),
    precio: new FormControl(''),
  });

  ngOnInit() {
    this.traer();

    this.suscripcion = this.db.canalAutos
      .on(
        'postgres_changes',
        {
          event: '*', // [INSERT, UPDATE, DELETE, *]
          schema: 'public',
          table: 'Autos',
        },
        (data: any) => {
          // EJECUTAR LO QUE QUERAMOS CUANDO LLEGUE EL EVENTO
          console.log(data);
          const auto = data.new as Auto;
          const old = data.old as Auto;

          switch (data.eventType) {
            case 'INSERT':
              this.autos.update((val) => [...val, auto]);
              break;
            case 'UPDATE':
              this.autos.update((val) => {
                const i = this.autos().findIndex((a) => a.id === auto.id);
                val[i] = auto;
                return [...val];
              });
              break;
            case 'DELETE':
              this.autos.update((val) => {
                const i = this.autos().findIndex((a) => a.id === old.id);
                val.splice(i, 1);
                return [...val];
              });
              break;
          }
        },
      )
      .subscribe();

    // Eventos propios

    this.db.supS.Sup.channel('test-channel')
      .on(
        'broadcast',
        { event: 'CLICK' }, // Listen for "shout". Can be "*" to listen to all events
        (payload) => console.log(payload),
      )
      .subscribe();
  }

  click() {
    this.db.supS.Sup.channel('test-channel').send({
      type: 'broadcast',
      event: 'CLICK',
      payload: { mensaje: 'HOLAAA' },
    });
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }

  async traer() {
    const autos = await this.db.findAll();

    this.autos.set(autos);
  }

  crear() {
    this.db.create(this.formCrear.value as AutoPorCrear);
  }
}
