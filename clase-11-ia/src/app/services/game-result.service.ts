import { Injectable, inject } from '@angular/core';
import { supabase } from '../lib/supabase.client';
import { AuthService } from './auth.service';

export interface GameResult {
  id: string;
  username: string;
  created_at: string;
}

export interface HangmanResult extends GameResult {
  word: string;
  score: number;
  letters_guessed: number;
  incorrect_attempts: number;
  time_taken: number;
  completed: boolean;
}

export interface HigherLowerResult extends GameResult {
  score: number;
  consecutive_correct: number;
  final_lives: number;
  time_taken: number;
  game_length: number;
}

export interface TriviaResult extends GameResult {
  score: number;
  correct_count: number;
  incorrect_count: number;
  time_taken: number;
  category?: string;
}

export interface BattleshipResult extends GameResult {
  winner: 'player' | 'ai';
  total_turns: number;
  player_hits: number;
  player_misses: number;
  ai_hits: number;
  ai_misses: number;
  time_taken: number;
}

type GameType = 'hangman' | 'higher_lower' | 'trivia' | 'battleship';

@Injectable({
  providedIn: 'root',
})
export class GameResultService {
  private authService = inject(AuthService);

  private getTableName(gameType: GameType): string {
    const tables: Record<GameType, string> = {
      hangman: 'hangman_results',
      higher_lower: 'higher_lower_results',
      trivia: 'trivia_results',
      battleship: 'battleship_results',
    };
    return tables[gameType];
  }

  async saveResult(gameType: GameType, result: Omit<GameResult, 'id' | 'created_at'>) {
    try {
      const tableName = this.getTableName(gameType);
      const { data, error } = await supabase.from(tableName).insert([result]).select();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to save result',
      };
    }
  }

  async getResultsByGame(gameType: GameType, limit: number = 10) {
    try {
      const tableName = this.getTableName(gameType);
      let query = supabase
        .from(tableName)
        .select('*')
        .order('score', { ascending: false })
        .limit(limit);

      // Order by different fields depending on game type
      if (gameType === 'higher_lower') {
        query = supabase
          .from(tableName)
          .select('*')
          .order('consecutive_correct', { ascending: false })
          .limit(limit);
      } else if (gameType === 'trivia') {
        query = supabase
          .from(tableName)
          .select('*')
          .order('correct_count', { ascending: false })
          .limit(limit);
      } else if (gameType === 'battleship') {
        query = supabase
          .from(tableName)
          .select('*')
          .order('total_turns', { ascending: true })
          .limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch results',
        data: [],
      };
    }
  }

  async getUserResults(gameType: GameType, username: string) {
    try {
      const tableName = this.getTableName(gameType);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('username', username)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch user results',
        data: [],
      };
    }
  }

  async getTopResults(gameType: GameType, limit: number = 10) {
    return this.getResultsByGame(gameType, limit);
  }
}
