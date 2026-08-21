import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from './components/card/card';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [Card, FormsModule],
  selector: 'app-tutoriales',
  styleUrl: './tutoriales.css',
  templateUrl: './tutoriales.html',
})
export class Tutoriales {
  // signal / señal. La señal va a indiar que se debe renderizar de vuelta la pantalla cuando sufra algún cambio.
  contador: WritableSignal<number> = signal(0);

  nombre = 'asd';

  imagen: string = 'img/158.png';

  contar(): void {
    // Así obtengo su valor
    console.log(this.contador());

    // Así le cambio el valor
    // this.contador.set(this.contador() + 1);
    this.contador.update((prev) => ++prev);
  }

  reiniciar() {
    this.nombre = '';
  }

  intervalo?: number;

  ngOnInit() {
    this.intervalo = setInterval(() => {
      this.contar();
    }, 1000);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.intervalo);
  }
}
