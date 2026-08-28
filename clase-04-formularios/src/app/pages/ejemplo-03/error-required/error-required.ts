import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-required',
  styleUrl: './error-required.css',
  templateUrl: './error-required.html',
})
export class ErrorRequired {
  errors = input<any>();
  mensaje = input<string | null>();
}
