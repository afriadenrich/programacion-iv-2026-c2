import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-email',
  styleUrl: './error-email.css',
  templateUrl: './error-email.html',
})
export class ErrorEmail {
  errors = input<any>();
  mensaje = input<string | null>();
}
