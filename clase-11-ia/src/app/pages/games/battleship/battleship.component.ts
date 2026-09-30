import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseGameComponent } from '../../../components/base-game/base-game.component';
import { BattleshipService, CellState } from '../../../services/battleship.service';
import { GameResultService } from '../../../services/game-result.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-battleship',
  standalone: true,
  imports: [CommonModule, BaseGameComponent],
  template: `
    <div class="container mx-auto py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-primary-600 mb-2">Battleship vs AI</h1>
          <p class="text-gray-600">Sink all ships to win!</p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8">
          <!-- Game Status -->
          <div class="grid grid-cols-5 gap-4 mb-8 text-center">
            <div class="bg-blue-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Time</p>
              <p class="text-xl font-bold text-primary-600">{{ timeRemaining() }}s</p>
            </div>
            <div class="bg-green-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Your Hits</p>
              <p class="text-xl font-bold text-green-600">{{ battleship.playerHits() }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Your Misses</p>
              <p class="text-xl font-bold text-red-600">{{ battleship.playerMisses() }}</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded">
              <p class="text-gray-600 text-sm">AI Ships Down</p>
              <p class="text-xl font-bold text-yellow-600">
                {{ battleship.aiShipsDestroyed() }}/{{ battleship.totalAIShips() }}
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded">
              <p class="text-gray-600 text-sm">Your Ships</p>
              <p class="text-xl font-bold text-purple-600">
                {{ battleship.playerShipsDestroyed() }}/{{ battleship.totalPlayerShips() }}
              </p>
            </div>
          </div>

          <!-- Boards -->
          <div class="grid grid-cols-2 gap-8 mb-8">
            <!-- Player Board -->
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Your Board</h3>
              <div class="inline-block border-4 border-gray-800">
                @for (row of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track row) {
                  <div class="flex">
                    @for (col of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track col) {
                      <div
                        class="w-8 h-8 border border-gray-400 flex items-center justify-center text-xs font-bold cursor-default"
                        [class]="getPlayerCellClass(row, col)"
                      >
                        {{ getCellContent(battleship.playerBoard(), row, col) }}
                      </div>
                    }
                  </div>
                }
              </div>
            </div>

            <!-- AI Board (Attack Board) -->
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Enemy Board</h3>
              <div class="inline-block border-4 border-gray-800">
                @for (row of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track row) {
                  <div class="flex">
                    @for (col of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track col) {
                      <button
                        (click)="attack(row, col)"
                        [disabled]="!battleship.playerTurn() || battleship.gameOver()"
                        class="w-8 h-8 border border-gray-400 flex items-center justify-center text-xs font-bold transition"
                        [class]="getAIBoardCellClass(row, col)"
                      >
                        {{ getCellContent(battleship.aiVisibleBoard(), row, col) }}
                      </button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Turn Indicator -->
          <div
            class="text-center mb-8 p-4 rounded-lg"
            [class]="
              battleship.playerTurn()
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-yellow-100 border-2 border-yellow-500'
            "
          >
            @if (battleship.playerTurn()) {
              <p class="text-lg font-bold text-blue-600">🎯 Your Turn - Click a cell to attack</p>
            } @else {
              <p class="text-lg font-bold text-yellow-600">⏳ AI is thinking...</p>
            }
          </div>

          <!-- Game Over -->
          @if (battleship.gameOver()) {
            <div
              class="p-6 rounded-lg mb-6"
              [class]="
                battleship.winner() === 'player'
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-red-50 border-2 border-red-500'
              "
            >
              @if (battleship.winner() === 'player') {
                <p class="text-2xl font-bold text-green-600 text-center">🎉 You Won!</p>
              } @else {
                <p class="text-2xl font-bold text-red-600 text-center">💔 Game Over!</p>
              }
              <p class="text-center text-gray-700 mt-2">
                You landed {{ battleship.playerHits() }} hits out of
                {{ battleship.playerHits() + battleship.playerMisses() }} shots
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
export class BattleshipComponent extends BaseGameComponent implements OnInit {
  battleship = inject(BattleshipService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  private startTime: number = 0;
  private gameAlreadySaved = false;

  ngOnInit() {
    this.battleship.initializeGame();
    this.startTimer(600);
    this.startTime = Date.now();
  }

  attack(x: number, y: number) {
    if (this.battleship.playerAttack(x, y) && this.battleship.gameOver()) {
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
      winner: this.battleship.winner() as 'player' | 'ai',
      total_turns:
        this.battleship.playerHits() +
        this.battleship.playerMisses() +
        this.battleship.aiHits() +
        this.battleship.aiMisses(),
      player_hits: this.battleship.playerHits(),
      player_misses: this.battleship.playerMisses(),
      ai_hits: this.battleship.aiHits(),
      ai_misses: this.battleship.aiMisses(),
      time_taken: timeTaken,
    };

    this.gameResultService.saveResult('battleship', result).then((res) => {
      if (!res.success) {
        this.notificationService.error('Failed to save result');
      }
    });
  }

  override onTimeUp() {
    super.onTimeUp();
    this.battleship.gameOver.set(true);
    this.battleship.winner.set('ai');
    if (!this.gameAlreadySaved) {
      this.saveResult();
    }
  }

  playAgain() {
    this.gameAlreadySaved = false;
    this.battleship.resetGame();
    this.startTimer(600);
    this.startTime = Date.now();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getPlayerCellClass(row: number, col: number): string {
    const key = `${row},${col}`;
    const state = this.battleship.playerBoard().get(key);

    if (state === CellState.Hit) return 'bg-red-500 text-white';
    if (state === CellState.Miss) return 'bg-blue-300';
    if (state === CellState.Ship) return 'bg-gray-500 text-white';
    return 'bg-blue-100';
  }

  getAIBoardCellClass(row: number, col: number): string {
    const key = `${row},${col}`;
    const state = this.battleship.aiVisibleBoard().get(key);

    if (state === CellState.Hit) return 'bg-red-500 text-white hover:bg-red-600';
    if (state === CellState.Miss) return 'bg-blue-300 hover:bg-blue-400';
    if (state === CellState.Unknown) return 'bg-blue-100 hover:bg-blue-200';
    return 'bg-gray-200';
  }

  getCellContent(board: Map<string, CellState>, row: number, col: number): string {
    const state = board.get(`${row},${col}`);
    if (state === CellState.Hit) return '💥';
    if (state === CellState.Miss) return '○';
    if (state === CellState.Ship) return '🚢';
    return '';
  }
}
