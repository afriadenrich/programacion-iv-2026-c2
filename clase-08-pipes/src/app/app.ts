import { Component, inject, signal } from '@angular/core';
import { EjemploAngular } from './ejemplo-angular/ejemplo-angular';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { AsyncPromisePipeComponent } from './ejemplo-async-pipe/ejemplo-async-pipe';
import { TexoLargoPipe } from './pipes/texo-largo-pipe';
import { FechaPasadaPipe } from './pipes/fecha-pasada-pipe';

@Component({
  selector: 'app-root',
  imports: [
    EjemploAngular,
    AsyncPromisePipeComponent,
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
    DatePipe,
    TexoLargoPipe,
    FechaPasadaPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  httpClient = inject(HttpClient);

  fecha = new Date('2026-09-09 15:04:13 +00');

  numero = 123.456;

  // haceCuantoFue = this.mostrarHaceCuantoFue(this.fecha.toString());

  promesa = signal<any>(null);

  ngOnInit() {
    console.log(Date.now());
  }

  /*

    Name	          Description
    AsyncPipe	      Read the value from a Promise or an RxJS Observable.
    CurrencyPipe  	Transforms a number to a currency string, formatted according to locale rules.
    DatePipe	      Formats a Date value according to locale rules.
    DecimalPipe 	  Transforms a number into a string with a decimal point, formatted according to locale rules.
    I18nPluralPipe	Maps a value to a string that pluralizes the value according to locale rules.
    I18nSelectPipe	Maps a key to a custom selector that returns a desired value.
    JsonPipe	      Transforms an object to a string representation via JSON.stringify, intended for debugging.
    KeyValuePipe	  Transforms Object or Map into an array of key value pairs.
    LowerCasePipe	  Transforms text to all lower case.
    PercentPipe	    Transforms a number to a percentage string, formatted according to locale rules.
    SlicePipe	      Creates a new Array or String containing a subset (slice) of the elements.
    TitleCasePipe	  Transforms text to title case.
    UpperCasePipe	T ransforms text to all upper case.

*/

    
}
