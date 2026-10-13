import { Injectable, signal, computed } from '@angular/core';

export enum CardSuit {
  Hearts = '♥️',
  Diamonds = '♦️',
  Clubs = '♣️',
  Spades = '♠️',
}

export interface Card {
  value: number;
  rank: string;
  suit: CardSuit;
}

@Injectable({
  providedIn: 'root',
})
export class HigherLowerService {
  private ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  currentCard = signal<Card | null>(null);
  nextCard = signal<Card | null>(null);
  lives = signal<number>(3);
  score = signal<number>(0);
  consecutiveCorrect = signal<number>(0);
  gameLength = signal<number>(0);

  isGameOver = computed(() => this.lives() === 0);
  canGuess = computed(
    () => !this.isGameOver() && this.currentCard() !== null && this.nextCard() !== null,
  );

  private getCardDeck(): Card[] {
    const deck: Card[] = [];
    const suits = Object.values(CardSuit);

    suits.forEach((suit) => {
      this.ranks.forEach((rank, index) => {
        deck.push({
          value: index + 1,
          rank,
          suit,
        });
      });
    });

    return this.shuffleDeck(deck);
  }

  private shuffleDeck(deck: Card[]): Card[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private currentDeck: Card[] = [];
  private deckIndex = 0;

  startGame() {
    this.currentDeck = this.getCardDeck();
    this.deckIndex = 0;
    this.lives.set(3);
    this.score.set(0);
    this.consecutiveCorrect.set(0);
    this.gameLength.set(0);
    this.drawInitialCard();
  }

  private drawInitialCard() {
    if (this.deckIndex < this.currentDeck.length) {
      this.currentCard.set(this.currentDeck[this.deckIndex++]);
      this.nextCard.set(null);
    }
  }

  drawNextCard() {
    if (this.deckIndex < this.currentDeck.length) {
      this.nextCard.set(this.currentDeck[this.deckIndex++]);
      this.gameLength.update((v) => v + 1);
    }
  }

  guess(isHigher: boolean): boolean {
    const current = this.currentCard();
    const next = this.nextCard();

    if (!current || !next) return false;

    const isCorrect =
      (isHigher && next.value > current.value) ||
      (!isHigher && next.value < current.value) ||
      (next.value === current.value && !isHigher); // Equal counts as not higher

    if (isCorrect) {
      this.consecutiveCorrect.update((v) => v + 1);
      this.score.update((v) => v + 10 * this.consecutiveCorrect());
      this.currentCard.set(next);
      this.nextCard.set(null);

      // Draw next card
      if (this.deckIndex < this.currentDeck.length) {
        setTimeout(() => this.drawNextCard(), 300);
      } else {
        // Game complete - drew all cards
        this.endGame();
      }
    } else {
      this.lives.update((v) => v - 1);
      this.consecutiveCorrect.set(0);

      if (this.lives() === 0) {
        this.endGame();
      } else {
        this.currentCard.set(next);
        this.nextCard.set(null);

        if (this.deckIndex < this.currentDeck.length) {
          setTimeout(() => this.drawNextCard(), 300);
        }
      }
    }

    return isCorrect;
  }

  endGame() {
    this.nextCard.set(null);
  }

  calculateScore(timeTaken: number): number {
    const baseScore = this.score();
    const bonusMultiplier = Math.max(1, (180 - timeTaken) / 30);
    return Math.round(baseScore * bonusMultiplier);
  }

  resetGame() {
    this.currentCard.set(null);
    this.nextCard.set(null);
    this.lives.set(3);
    this.score.set(0);
    this.consecutiveCorrect.set(0);
    this.gameLength.set(0);
  }
}
