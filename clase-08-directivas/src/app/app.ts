import { Component, signal } from '@angular/core';
import { Highlight } from './directives/highlight';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Highlight]
})
export class App {
  esRojo = signal(false);
  esNegrita = signal(false);
}
