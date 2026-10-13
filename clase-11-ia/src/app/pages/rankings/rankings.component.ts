import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingsService } from '../../services/rankings.service';

@Component({
  selector: 'app-rankings',
  template: `
    <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-dark mb-8 text-center">Rankings</h1>

        <!-- Game Selection -->
        <div class="mb-8 flex justify-center gap-4 flex-wrap">
          @for (game of rankingsService.getAvailableGames(); track game.id) {
            <button
              (click)="selectGame(game.id)"
              [class.bg-primary]="rankingsService.selectedGame() === game.id"
              [class.bg-accent]="rankingsService.selectedGame() !== game.id"
              [class.text-white]="rankingsService.selectedGame() === game.id"
              [class.text-dark]="rankingsService.selectedGame() !== game.id"
              class="px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              [attr.aria-pressed]="rankingsService.selectedGame() === game.id"
            >
              {{ game.name }}
            </button>
          }
        </div>

        <!-- Loading State -->
        @if (rankingsService.isLoading()) {
          <div class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
            <p class="mt-4 text-dark/70">Loading rankings...</p>
          </div>
        }

        <!-- Rankings Table -->
        @if (!rankingsService.isLoading() && rankingsService.rankings().length > 0) {
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <table class="w-full" role="table" aria-label="Top 10 rankings">
              <thead class="bg-primary text-white">
                <tr>
                  <th class="px-6 py-3 text-left text-sm font-semibold">Rank</th>
                  <th class="px-6 py-3 text-left text-sm font-semibold">Player</th>
                  <th class="px-6 py-3 text-left text-sm font-semibold">Score</th>
                  <th class="px-6 py-3 text-left text-sm font-semibold">{{ getMetricLabel() }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-dark/10">
                @for (entry of rankingsService.rankings(); track entry.username) {
                  <tr class="hover:bg-background transition-colors">
                    <td class="px-6 py-4 text-sm font-bold text-primary">{{ entry.rank }}</td>
                    <td class="px-6 py-4 text-sm text-dark">{{ entry.username }}</td>
                    <td class="px-6 py-4 text-sm text-dark/80">{{ entry.score }}</td>
                    <td class="px-6 py-4 text-sm text-dark/80">{{ entry.gameSpecificMetric }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }

        <!-- Empty State -->
        @if (!rankingsService.isLoading() && rankingsService.rankings().length === 0) {
          <div class="bg-white rounded-lg shadow-lg p-12 text-center">
            <p class="text-dark/60 text-lg">No results yet for this game. Play and be the first!</p>
          </div>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  host: { class: 'block w-full' },
})
export class RankingsComponent implements OnInit {
  rankingsService = inject(RankingsService);

  ngOnInit(): void {
    this.rankingsService.fetchRankings('hangman');
  }

  selectGame(game: 'hangman' | 'higher_lower' | 'trivia' | 'battleship'): void {
    this.rankingsService.fetchRankings(game);
  }

  getMetricLabel(): string {
    const game = this.rankingsService.selectedGame();
    const labels: Record<string, string> = {
      hangman: 'Attempts',
      higher_lower: 'Consecutive Correct',
      trivia: 'Correct Answers',
      battleship: 'Hits',
    };
    return labels[game] || '';
  }
}
