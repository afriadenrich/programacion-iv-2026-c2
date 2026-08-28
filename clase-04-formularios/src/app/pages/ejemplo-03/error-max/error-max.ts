import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-max',
  styleUrl: './error-max.css',
  templateUrl: './error-max.html',
})
export class ErrorMax {
  errors = input<any>();
  mensaje = input<string | null>();
}
