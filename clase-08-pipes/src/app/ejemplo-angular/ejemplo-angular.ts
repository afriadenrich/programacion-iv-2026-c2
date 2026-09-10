import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  selector: 'app-ejemplo-angular',
  styleUrl: './ejemplo-angular.css',
  templateUrl: './ejemplo-angular.html',
})
export class EjemploAngular {
  amount = 123.45;
  // company = 'acme corporation';
  company = 'acme CORporation';
  purchasedOn = '2024-07-08';
}
