import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../../../components/base-game/base-game.component';
import { HangmanService } from '../../../services/hangman.service';
import { GameResultService } from '../../../services/game-result.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <div class="container mx-auto py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-primary-600 mb-2">Hangman Game</h1>
          <p class="text-gray-600">Guess the word before time runs out!</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8">
          <!-- Game Status -->
          <div class="grid grid-cols-3 gap-4 mb-8 text-center">
            <div class="bg-blue-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Time Remaining</p>
              <p class="text-2xl font-bold text-primary-600">{{ timeRemaining() }}s</p>
            </div>
            <div class="bg-green-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Score</p>
              <p class="text-2xl font-bold text-green-600">{{ currentScore() }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Attempts Left</p>
              <p class="text-2xl font-bold text-red-600">
                {{ hangmanService.remainingAttempts() }}
              </p>
            </div>
          </div>

          <!-- Hangman Drawing -->
          <div class="text-center mb-8">
            <p class="text-6xl mb-4">{{ getHangmanStage() }}</p>
          </div>

          <!-- Word Display -->
          <div class="text-center mb-8 p-6 bg-gray-100 rounded">
            <p class="text-5xl font-bold tracking-widest text-primary-600 font-mono">
              {{ hangmanService.displayWord() }}
            </p>
          </div>

          <!-- Incorrect Letters -->
          @if (hangmanService.incorrectLetters().length > 0) {
            <div class="mb-6 p-4 bg-red-50 rounded">
              <p class="text-sm text-gray-600 mb-2">Incorrect Letters:</p>
              <p class="text-lg font-semibold text-red-600">
                {{ hangmanService.incorrectLetters().join(', ').toUpperCase() }}
              </p>
            </div>
          }

          <!-- Keyboard -->
          <div class="grid grid-cols-7 gap-2 mb-8">
            @for (letter of hangmanService.getAvailableLetters(); track letter) {
              <button
                (click)="guessLetter(letter)"
                [disabled]="hangmanService.isGameOver()"
                class="py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-bold rounded transition uppercase text-sm"
              >
                {{ letter }}
              </button>
            }
          </div>

          <!-- Game Over Message -->
          @if (hangmanService.isGameOver()) {
            <div
              class="p-6 rounded-lg mb-6"
              [class]="
                hangmanService.isGameWon()
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              "
            >
              @if (hangmanService.isGameWon()) {
                <p class="text-2xl font-bold text-green-600 text-center">🎉 You Won!</p>
                <p class="text-center text-gray-600 mt-2">
                  The word was: <span class="font-bold">{{ hangmanService.currentWord() }}</span>
                </p>
              } @else {
                <p class="text-2xl font-bold text-red-600 text-center">💔 Game Over!</p>
                <p class="text-center text-gray-600 mt-2">
                  The word was: <span class="font-bold">{{ hangmanService.currentWord() }}</span>
                </p>
              }
              <p class="text-center text-xl font-bold mt-4 text-gray-800">
                Final Score: {{ currentScore() }}
              </p>
            </div>

            <!-- Action Buttons -->
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
export class HangmanComponent extends BaseGameComponent implements OnInit, OnDestroy {
  hangmanService = inject(HangmanService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  private startTime: number = 0;
  private gameAlreadySaved = false;

  ngOnInit() {
    this.hangmanService.startGame();
    this.startTimer(120);
    this.startTime = Date.now();
  }

  guessLetter(letter: string) {
    this.hangmanService.guessLetter(letter);
    this.updateScore(0); // Score updates based on final calculation

    if (this.hangmanService.isGameOver()) {
      this.endGame();
      this.saveResult();
    }
  }

  private saveResult() {
    if (this.gameAlreadySaved) return;
    this.gameAlreadySaved = true;

    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    const score = this.hangmanService.calculateScore(timeTaken);

    const result = {
      username: this.authService.currentUsername(),
      word: this.hangmanService.currentWord(),
      score,
      letters_guessed: this.hangmanService.guessedLetters().size,
      incorrect_attempts: this.hangmanService.incorrectAttempts(),
      time_taken: timeTaken,
      completed: this.hangmanService.isGameWon(),
    };

    this.gameResultService.saveResult('hangman', result).then((res) => {
      if (!res.success) {
        this.notificationService.error('Failed to save result');
      }
    });
  }

  protected override onTimeUp() {
    super.onTimeUp();
    if (!this.gameAlreadySaved) {
      this.saveResult();
    }
  }

  playAgain() {
    this.gameAlreadySaved = false;
    this.hangmanService.resetGame();
    this.hangmanService.startGame();
    this.startTimer(120);
    this.startTime = Date.now();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getHangmanStage(): string {
    const stages = ['😊', '😐', '😕', '😟', '😢', '😭', '💀'];
    return stages[this.hangmanService.incorrectAttempts()];
  }
}
