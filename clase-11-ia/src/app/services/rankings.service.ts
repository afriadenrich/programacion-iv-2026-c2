import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { supabase } from '../lib/supabase.client';

export interface RankingEntry {
  rank: number;
  username: string;
  score: number;
  gameSpecificMetric: number;
}

@Injectable({ providedIn: 'root' })
export class RankingsService {
  rankings = signal<RankingEntry[]>([]);
  selectedGame = signal<'hangman' | 'higher_lower' | 'trivia' | 'battleship'>('hangman');
  isLoading = signal(false);

  async fetchRankings(game: 'hangman' | 'higher_lower' | 'trivia' | 'battleship'): Promise<void> {
    this.isLoading.set(true);
    try {
      let query = supabase.from(this.getTableName(game)).select('username, score');

      if (game === 'higher_lower') {
        query = supabase
          .from(this.getTableName(game))
          .select('username, score, consecutive_correct');
      } else if (game === 'trivia') {
        query = supabase.from(this.getTableName(game)).select('username, score, correct_count');
      } else if (game === 'battleship') {
        query = supabase
          .from(this.getTableName(game))
          .select('username, score:total_turns, player_hits');
      }

      const { data, error } = await query.order('score', { ascending: false }).limit(10);

      if (error) throw error;

      const formattedRankings = (data || []).map((entry: any, index: number) => ({
        rank: index + 1,
        username: entry.username,
        score: entry.score,
        gameSpecificMetric: this.getGameMetric(game, entry),
      }));

      this.rankings.set(formattedRankings);
      this.selectedGame.set(game);
    } finally {
      this.isLoading.set(false);
    }
  }

  private getTableName(game: string): string {
    const tableMap: Record<string, string> = {
      hangman: 'hangman_results',
      higher_lower: 'higher_lower_results',
      trivia: 'trivia_results',
      battleship: 'battleship_results',
    };
    return tableMap[game];
  }

  private getGameMetric(game: string, entry: any): number {
    switch (game) {
      case 'hangman':
        return entry.incorrect_attempts || 0;
      case 'higher_lower':
        return entry.consecutive_correct || 0;
      case 'trivia':
        return entry.correct_count || 0;
      case 'battleship':
        return entry.player_hits || 0;
      default:
        return 0;
    }
  }

  getAvailableGames(): Array<{
    id: 'hangman' | 'higher_lower' | 'trivia' | 'battleship';
    name: string;
  }> {
    return [
      { id: 'hangman', name: 'Hangman' },
      { id: 'higher_lower', name: 'Higher or Lower' },
      { id: 'trivia', name: 'Trivia' },
      { id: 'battleship', name: 'Battleship' },
    ];
  }
}
