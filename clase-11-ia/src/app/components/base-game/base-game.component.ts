import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameResultService } from '../../services/game-result.service';

export interface GameState {
  isActive: boolean;
  score: number;
  timeRemaining: number;
}

@Component({
  selector: 'app-base-game',
  standalone: true,
  template: '',
})
export class BaseGameComponent implements OnDestroy {
  protected gameResultService = inject(GameResultService);

  // Game state
  protected gameState = signal<GameState>({
    isActive: true,
    score: 0,
    timeRemaining: 60,
  });

  protected isGameActive = computed(() => this.gameState().isActive);
  protected currentScore = computed(() => this.gameState().score);
  protected timeRemaining = computed(() => this.gameState().timeRemaining);

  // Timer subscription
  private timerSubscription: Subscription | null = null;

  constructor() {
    this.startTimer();
  }

  protected startTimer(duration: number = 60) {
    // Clear existing timer
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    // Reset time remaining
    this.gameState.update((state) => ({
      ...state,
      timeRemaining: duration,
      isActive: true,
    }));

    // Start timer
    this.timerSubscription = interval(1000).subscribe(() => {
      this.gameState.update((state) => {
        const newTime = state.timeRemaining - 1;

        if (newTime <= 0) {
          return {
            ...state,
            timeRemaining: 0,
            isActive: false,
          };
        }

        return {
          ...state,
          timeRemaining: newTime,
        };
      });

      // Check if time is up
      if (this.gameState().timeRemaining === 0) {
        this.onTimeUp();
      }
    });
  }

  protected updateScore(points: number) {
    this.gameState.update((state) => ({
      ...state,
      score: state.score + points,
    }));
  }

  protected setScore(score: number) {
    this.gameState.update((state) => ({
      ...state,
      score,
    }));
  }

  protected endGame() {
    this.gameState.update((state) => ({
      ...state,
      isActive: false,
    }));

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  protected onTimeUp() {
    this.endGame();
  }

  protected resetGame(duration: number = 60) {
    this.endGame();
    this.startTimer(duration);
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
