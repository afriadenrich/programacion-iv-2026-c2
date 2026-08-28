import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-max-length',
  styleUrl: './error-max-length.css',
  templateUrl: './error-max-length.html',
})
export class ErrorMaxLength {
  errors = input<any>();
  mensaje = input<string | null>();
}
