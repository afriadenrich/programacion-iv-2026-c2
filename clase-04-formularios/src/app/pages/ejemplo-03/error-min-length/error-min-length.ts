import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-min-length',
  styleUrl: './error-min-length.css',
  templateUrl: './error-min-length.html',
})
export class ErrorMinLength {
  errors = input<any>();
  mensaje = input<string | null>();
}
