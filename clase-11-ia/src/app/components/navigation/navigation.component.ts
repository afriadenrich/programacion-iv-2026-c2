import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-primary-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center">
            <span class="text-2xl font-bold">🎮 GameHub</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-6">
            @if (isAuthenticated()) {
              <a
                routerLink="/home"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Home
              </a>
              <a
                routerLink="/games"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Games
              </a>
              <a
                routerLink="/rankings"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Rankings
              </a>
              <a
                routerLink="/chat"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Chat
              </a>
              <a
                routerLink="/about"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                About
              </a>

              <div class="flex items-center gap-4 ml-6 pl-6 border-l border-primary-400">
                <span class="text-sm">{{ currentUsername() }}</span>
                <button
                  (click)="logout()"
                  class="bg-secondary-600 hover:bg-secondary-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            } @else {
              <a
                routerLink="/login"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Login
              </a>
              <a
                routerLink="/register"
                routerLinkActive="text-secondary-400"
                class="hover:text-secondary-200 transition"
              >
                Register
              </a>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden flex flex-col gap-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span class="w-6 h-0.5 bg-white block"></span>
            <span class="w-6 h-0.5 bg-white block"></span>
            <span class="w-6 h-0.5 bg-white block"></span>
          </button>
        </div>

        <!-- Mobile Menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden mt-4 pb-4 space-y-2">
            @if (isAuthenticated()) {
              <a routerLink="/home" class="block px-4 py-2 hover:bg-primary-500 rounded transition">
                Home
              </a>
              <a
                routerLink="/games"
                class="block px-4 py-2 hover:bg-primary-500 rounded transition"
              >
                Games
              </a>
              <a
                routerLink="/rankings"
                class="block px-4 py-2 hover:bg-primary-500 rounded transition"
              >
                Rankings
              </a>
              <a routerLink="/chat" class="block px-4 py-2 hover:bg-primary-500 rounded transition">
                Chat
              </a>
              <a
                routerLink="/about"
                class="block px-4 py-2 hover:bg-primary-500 rounded transition"
              >
                About
              </a>
              <button
                (click)="logout()"
                class="w-full text-left px-4 py-2 bg-secondary-600 hover:bg-secondary-700 rounded transition"
              >
                Logout
              </button>
            } @else {
              <a
                routerLink="/login"
                class="block px-4 py-2 hover:bg-primary-500 rounded transition"
              >
                Login
              </a>
              <a
                routerLink="/register"
                class="block px-4 py-2 hover:bg-primary-500 rounded transition"
              >
                Register
              </a>
            }
          </div>
        }
      </div>
    </nav>
  `,
})
export class NavigationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated = this.authService.isAuthenticated;
  currentUsername = this.authService.currentUsername;
  mobileMenuOpen = this.authService.mobileMenuOpen;

  toggleMobileMenu() {
    this.authService.toggleMobileMenu();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
