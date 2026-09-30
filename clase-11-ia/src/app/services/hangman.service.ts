import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HangmanService {
  private wordList = [
    'angular',
    'typescript',
    'supabase',
    'database',
    'component',
    'service',
    'routing',
    'signal',
    'reactive',
    'standalone',
    'tailwind',
    'programming',
    'internet',
    'algorithm',
    'function',
    'variable',
    'constant',
    'developer',
    'console',
    'browser',
    'network',
    'password',
    'authentication',
    'authorization',
  ];

  currentWord = signal<string>('');
  guessedLetters = signal<Set<string>>(new Set());
  incorrectAttempts = signal<number>(0);
  maxAttempts = 6;

  displayWord = computed(() => {
    const word = this.currentWord();
    const guessed = this.guessedLetters();
    return word
      .split('')
      .map((letter) => (guessed.has(letter.toLowerCase()) ? letter : '_'))
      .join(' ');
  });

  incorrectLetters = computed(() => {
    const word = this.currentWord();
    const guessed = this.guessedLetters();
    return Array.from(guessed).filter((letter) => !word.toLowerCase().includes(letter));
  });

  remainingAttempts = computed(() => this.maxAttempts - this.incorrectAttempts());

  isGameWon = computed(() => {
    const word = this.currentWord();
    const guessed = this.guessedLetters();
    return word.split('').every((letter) => guessed.has(letter.toLowerCase()));
  });

  isGameLost = computed(() => this.incorrectAttempts() >= this.maxAttempts);

  isGameOver = computed(() => this.isGameWon() || this.isGameLost());

  getAvailableLetters = computed(() => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const guessed = this.guessedLetters();
    return alphabet.filter((letter) => !guessed.has(letter));
  });

  startGame() {
    const randomWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.currentWord.set(randomWord);
    this.guessedLetters.set(new Set());
    this.incorrectAttempts.set(0);
  }

  guessLetter(letter: string): boolean {
    if (this.isGameOver() || this.guessedLetters().has(letter.toLowerCase())) {
      return false;
    }

    const newGuessed = new Set(this.guessedLetters());
    newGuessed.add(letter.toLowerCase());
    this.guessedLetters.set(newGuessed);

    if (!this.currentWord().toLowerCase().includes(letter.toLowerCase())) {
      this.incorrectAttempts.update((v) => v + 1);
      return false;
    }

    return true;
  }

  calculateScore(timeTaken: number): number {
    const baseScore = 100;
    const letterBonus = this.guessedLetters().size * 5;
    const incorrectPenalty = this.incorrectAttempts() * 10;
    const timeBonus = Math.max(0, (120 - timeTaken) / 2);

    return Math.max(0, Math.round(baseScore + letterBonus - incorrectPenalty + timeBonus));
  }

  resetGame() {
    this.currentWord.set('');
    this.guessedLetters.set(new Set());
    this.incorrectAttempts.set(0);
  }
}
