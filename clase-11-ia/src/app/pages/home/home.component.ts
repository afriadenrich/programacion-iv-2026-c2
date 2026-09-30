import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface GameCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-home',
  template: `
    <div
      class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">
            Welcome, {{ authService.currentUser()?.username }}!
          </h1>
          <p class="text-xl text-gray-600 mb-2">Choose a game and test your skills</p>
          <p class="text-gray-500">Compete with other players and climb the rankings</p>
        </div>

        <!-- Games Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          @for (game of games; track game.id) {
            <div
              class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div class="p-6">
                <div class="text-4xl mb-4">{{ game.icon }}</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ game.title }}</h2>
                <p class="text-gray-600 mb-4">{{ game.description }}</p>
                <a
                  [routerLink]="game.path"
                  class="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  [attr.aria-label]="'Play ' + game.title"
                >
                  Play Now
                </a>
              </div>
            </div>
          }
        </div>

        <!-- Quick Links Section -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              routerLink="/rankings"
              class="flex items-center p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <span class="text-3xl mr-4">📊</span>
              <div>
                <h3 class="font-bold text-gray-900">Rankings</h3>
                <p class="text-sm text-gray-600">See top players</p>
              </div>
            </a>
            <a
              routerLink="/chat"
              class="flex items-center p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <span class="text-3xl mr-4">💬</span>
              <div>
                <h3 class="font-bold text-gray-900">Chat</h3>
                <p class="text-sm text-gray-600">Connect with players</p>
              </div>
            </a>
            <a
              routerLink="/about"
              class="flex items-center p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <span class="text-3xl mr-4">👤</span>
              <div>
                <h3 class="font-bold text-gray-900">About</h3>
                <p class="text-sm text-gray-600">Meet the creator</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterLink],
  host: { class: 'block w-full' },
})
export class HomeComponent {
  authService = inject(AuthService);

  games: GameCard[] = [
    {
      id: 'hangman',
      title: 'Hangman',
      description: 'Guess the word before time runs out. A classic word-guessing game.',
      icon: '🎮',
      path: '/games/hangman',
    },
    {
      id: 'higher_lower',
      title: 'Higher or Lower',
      description: 'Predict if the next card is higher or lower. Test your luck with poker cards.',
      icon: '🃏',
      path: '/games/higher-lower',
    },
    {
      id: 'trivia',
      title: 'Trivia',
      description: 'Answer 20 trivia questions. Show off your knowledge across various topics.',
      icon: '🧠',
      path: '/games/trivia',
    },
    {
      id: 'battleship',
      title: 'Battleship',
      description: 'Strategic naval warfare against AI. Place ships and sink the opponent.',
      icon: '⚓',
      path: '/games/battleship',
    },
  ];
}
