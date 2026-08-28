import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-min',
  styleUrl: './error-min.css',
  templateUrl: './error-min.html',
})
export class ErrorMin {
  errors = input<any>();
  mensaje = input<string | null>();
}
