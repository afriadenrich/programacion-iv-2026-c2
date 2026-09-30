import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../../../components/base-game/base-game.component';
import { HigherLowerService } from '../../../services/higher-lower.service';
import { GameResultService } from '../../../services/game-result.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-higher-lower',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <div class="container mx-auto py-8">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-primary-600 mb-2">Higher or Lower</h1>
          <p class="text-gray-600">Predict if the next card will be higher or lower!</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8">
          <!-- Stats -->
          <div class="grid grid-cols-4 gap-4 mb-8 text-center">
            <div class="bg-blue-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Time</p>
              <p class="text-2xl font-bold text-primary-600">{{ timeRemaining() }}s</p>
            </div>
            <div class="bg-green-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Score</p>
              <p class="text-2xl font-bold text-green-600">{{ game.score() }}</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Streak</p>
              <p class="text-2xl font-bold text-yellow-600">{{ game.consecutiveCorrect() }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Lives</p>
              <p
                class="text-2xl font-bold"
                [class]="game.lives() > 1 ? 'text-red-600' : 'text-red-700'"
              >
                {{ game.lives() }}/3 {{ '❤️'.repeat(game.lives()) }}
              </p>
            </div>
          </div>

          <!-- Cards Display -->
          <div class="mb-8">
            <div class="grid grid-cols-3 gap-4 items-center">
              <!-- Current Card -->
              <div class="flex justify-center">
                @if (game.currentCard()) {
                  <div
                    class="bg-white border-4 border-primary-600 rounded-lg p-8 w-32 h-48 flex flex-col items-center justify-center shadow-lg"
                  >
                    <p class="text-6xl font-bold text-primary-600">
                      {{ game.currentCard()!.rank }}
                    </p>
                    <p class="text-4xl mt-4">{{ game.currentCard()!.suit }}</p>
                  </div>
                }
              </div>

              <!-- VS -->
              <div class="text-center">
                <p class="text-2xl font-bold text-gray-600">VS</p>
                <p class="text-gray-500 text-sm">?</p>
              </div>

              <!-- Next Card -->
              <div class="flex justify-center">
                @if (game.nextCard()) {
                  <div
                    class="bg-primary-100 border-4 border-primary-400 rounded-lg p-8 w-32 h-48 flex flex-col items-center justify-center shadow-lg animate-bounce"
                  >
                    <p class="text-6xl font-bold text-primary-600">{{ game.nextCard()!.rank }}</p>
                    <p class="text-4xl mt-4">{{ game.nextCard()!.suit }}</p>
                  </div>
                } @else {
                  <div
                    class="bg-gray-100 border-4 border-dashed border-gray-300 rounded-lg p-8 w-32 h-48 flex items-center justify-center"
                  >
                    <p class="text-gray-500">?</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Buttons -->
          @if (!game.isGameOver() && game.canGuess()) {
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button
                (click)="guess(true)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition text-lg"
              >
                ⬆️ Higher
              </button>
              <button
                (click)="guess(false)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition text-lg"
              >
                ⬇️ Lower
              </button>
            </div>
          }

          <!-- Game Over -->
          @if (game.isGameOver()) {
            <div class="p-6 rounded-lg mb-6 bg-red-50 border-2 border-red-500">
              <p class="text-2xl font-bold text-red-600 text-center">💔 Game Over!</p>
              <p class="text-center text-gray-600 mt-2">
                You made {{ game.gameLength() }} correct predictions
              </p>
              <p class="text-center text-xl font-bold mt-4 text-gray-800">
                Final Score: {{ finalScore }}
              </p>
            </div>

            <div class="flex gap-4">
              <button
                (click)="playAgain()"
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition"
              >
                Play Again
              </button>
              <button
                (click)="goHome()"
                class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
              >
                Back to Home
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class HigherLowerComponent extends BaseGameComponent implements OnInit {
  game = inject(HigherLowerService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  private startTime: number = 0;
  private gameAlreadySaved = false;
  finalScore = 0;

  ngOnInit() {
    this.game.startGame();
    this.game.drawNextCard();
    this.startTimer(180);
    this.startTime = Date.now();
  }

  guess(isHigher: boolean) {
    this.game.guess(isHigher);

    if (this.game.isGameOver()) {
      this.endGame();
      this.saveResult();
    }
  }

  private saveResult() {
    if (this.gameAlreadySaved) return;
    this.gameAlreadySaved = true;

    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    this.finalScore = this.game.calculateScore(timeTaken);

    const result = {
      username: this.authService.currentUsername(),
      score: this.finalScore,
      consecutive_correct: this.game.consecutiveCorrect(),
      final_lives: this.game.lives(),
      time_taken: timeTaken,
      game_length: this.game.gameLength(),
    };

    this.gameResultService.saveResult('higher_lower', result).then((res) => {
      if (!res.success) {
        this.notificationService.error('Failed to save result');
      }
    });
  }

  protected override onTimeUp() {
    super.onTimeUp();
    this.game.endGame();
    if (!this.gameAlreadySaved) {
      this.saveResult();
    }
  }

  playAgain() {
    this.gameAlreadySaved = false;
    this.game.resetGame();
    this.game.startGame();
    this.game.drawNextCard();
    this.startTimer(180);
    this.startTime = Date.now();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
