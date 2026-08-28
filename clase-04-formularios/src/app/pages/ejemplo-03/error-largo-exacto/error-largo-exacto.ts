import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-largo-exacto',
  styleUrl: './error-largo-exacto.css',
  templateUrl: './error-largo-exacto.html',
})
export class ErrorLargoExacto {
  errors = input<any>();
  mensaje = input<string | null>();
}
