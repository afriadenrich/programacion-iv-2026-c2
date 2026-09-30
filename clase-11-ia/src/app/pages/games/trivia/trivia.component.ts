import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../../../components/base-game/base-game.component';
import { TriviaService } from '../../../services/trivia.service';
import { GameResultService } from '../../../services/game-result.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <div class="container mx-auto py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-primary-600 mb-2">Trivia Challenge</h1>
          <p class="text-gray-600">Answer 20 questions correctly!</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8">
          @if (!trivia.isGameComplete()) {
            <!-- Progress and Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6 text-center">
              <div class="bg-blue-50 p-4 rounded">
                <p class="text-gray-600 text-sm">Question</p>
                <p class="text-2xl font-bold text-primary-600">
                  {{ trivia.answeredQuestions() + 1 }}/20
                </p>
              </div>
              <div class="bg-green-50 p-4 rounded">
                <p class="text-gray-600 text-sm">Correct</p>
                <p class="text-2xl font-bold text-green-600">{{ trivia.correctAnswers() }}</p>
              </div>
              <div class="bg-red-50 p-4 rounded">
                <p class="text-gray-600 text-sm">Time</p>
                <p class="text-2xl font-bold text-red-600">{{ timeRemaining() }}s</p>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                [style.width.%]="(trivia.answeredQuestions() / 20) * 100"
              ></div>
            </div>

            @if (trivia.currentQuestion()) {
              <!-- Question -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                  {{ trivia.currentQuestion()!.question }}
                </h2>

                <!-- Options -->
                <div class="space-y-3">
                  @for (option of trivia.currentQuestion()!.options; track $index; let i = $index) {
                    <button
                      (click)="selectAnswer(i)"
                      [disabled]="trivia.isAnswered()"
                      [class]="getOptionClass(i)"
                      class="w-full p-4 rounded-lg text-left font-semibold transition"
                    >
                      <span class="inline-block w-8 h-8 rounded-full bg-gray-300 text-center mr-3">
                        {{ getLetterOption(i) }}
                      </span>
                      {{ option }}
                    </button>
                  }
                </div>
              </div>

              <!-- Result Message -->
              @if (trivia.showResult()) {
                <div
                  [class]="
                    trivia.selectedAnswer() === trivia.currentQuestion()!.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  "
                  class="p-4 rounded-lg border-2 mb-6"
                >
                  @if (trivia.selectedAnswer() === trivia.currentQuestion()!.correctAnswer) {
                    <p class="text-green-600 font-bold">✓ Correct!</p>
                  } @else {
                    <p class="text-red-600 font-bold">✗ Incorrect!</p>
                    <p class="text-gray-700 mt-2">
                      The correct answer was:
                      <span class="font-bold">{{
                        trivia.currentQuestion()!.options[trivia.currentQuestion()!.correctAnswer]
                      }}</span>
                    </p>
                  }
                </div>

                <!-- Next Button -->
                @if (trivia.answeredQuestions() < 19) {
                  <button
                    (click)="nextQuestion()"
                    class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Next Question
                  </button>
                }
              }
            }
          }

          <!-- Game Complete -->
          @if (trivia.isGameComplete()) {
            <div class="text-center">
              <div class="mb-8">
                <p class="text-6xl mb-4">{{ getScoreEmoji() }}</p>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
                <div class="bg-primary-50 p-8 rounded-lg mb-8">
                  <p class="text-gray-600 mb-2">Your Score</p>
                  <p class="text-5xl font-bold text-primary-600 mb-2">{{ trivia.score() }}%</p>
                  <p class="text-lg text-gray-700">
                    {{ trivia.correctAnswers() }} out of 20 correct
                  </p>
                </div>
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
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class TriviaComponent extends BaseGameComponent implements OnInit {
  trivia = inject(TriviaService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  private startTime: number = 0;
  private gameAlreadySaved = false;

  ngOnInit() {
    this.trivia.startGame();
    this.startTimer(300); // 5 minutes
    this.startTime = Date.now();
  }

  selectAnswer(optionIndex: number) {
    this.trivia.selectAnswer(optionIndex);
  }

  nextQuestion() {
    this.trivia.nextQuestion();

    if (this.trivia.isGameComplete()) {
      this.endGame();
      this.saveResult();
    }
  }

  private saveResult() {
    if (this.gameAlreadySaved) return;
    this.gameAlreadySaved = true;

    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);

    const result = {
      username: this.authService.currentUsername(),
      score: this.trivia.score(),
      correct_count: this.trivia.correctAnswers(),
      incorrect_count: 20 - this.trivia.correctAnswers(),
      time_taken: timeTaken,
      category: 'Mixed',
    };

    this.gameResultService.saveResult('trivia', result).then((res) => {
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
    this.trivia.resetGame();
    this.startTimer(300);
    this.startTime = Date.now();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getOptionClass(index: number): string {
    if (!this.trivia.showResult()) {
      return 'bg-gray-100 hover:bg-gray-200';
    }

    const isCorrect = index === this.trivia.currentQuestion()?.correctAnswer;
    const isSelected = index === this.trivia.selectedAnswer();

    if (isSelected && isCorrect) {
      return 'bg-green-200 border-2 border-green-500';
    } else if (isSelected && !isCorrect) {
      return 'bg-red-200 border-2 border-red-500';
    } else if (isCorrect) {
      return 'bg-green-100';
    } else {
      return 'bg-gray-100';
    }
  }

  getScoreEmoji(): string {
    const score = this.trivia.score();
    if (score === 100) return '🏆';
    if (score >= 80) return '🌟';
    if (score >= 60) return '👍';
    if (score >= 40) return '💪';
    return '📚';
  }

  getLetterOption(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
