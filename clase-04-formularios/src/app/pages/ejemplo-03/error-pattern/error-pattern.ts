import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-pattern',
  styleUrl: './error-pattern.css',
  templateUrl: './error-pattern.html',
})
export class ErrorPattern {
  errors = input<any>();
  mensaje = input<string | null>();
}
