import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navigation></app-navigation>
      <main class="flex-1 container mx-auto w-full">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class App {}
