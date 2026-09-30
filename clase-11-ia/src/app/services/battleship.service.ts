import { Injectable, signal, computed } from '@angular/core';

export interface Ship {
  id: number;
  x: number;
  y: number;
  horizontal: boolean;
  size: number;
  hits: Set<string>;
}

export enum CellState {
  Empty = 'empty',
  Hit = 'hit',
  Miss = 'miss',
  Ship = 'ship',
  Unknown = 'unknown',
}

@Injectable({
  providedIn: 'root',
})
export class BattleshipService {
  readonly BOARD_SIZE = 10;
  readonly SHIPS = [
    { size: 4, count: 1 }, // Battleship
    { size: 3, count: 2 }, // Cruisers
    { size: 2, count: 3 }, // Destroyers
    { size: 1, count: 4 }, // Submarines
  ];

  // Player board
  playerShips = signal<Ship[]>([]);
  playerBoard = signal<Map<string, CellState>>(new Map());

  // AI board
  aiShips = signal<Ship[]>([]);
  aiBoard = signal<Map<string, CellState>>(new Map());
  aiVisibleBoard = signal<Map<string, CellState>>(new Map());

  // Game state
  playerTurn = signal<boolean>(true);
  playerHits = signal<number>(0);
  playerMisses = signal<number>(0);
  aiHits = signal<number>(0);
  aiMisses = signal<number>(0);
  gameOver = signal<boolean>(false);
  winner = signal<'player' | 'ai' | null>(null);

  playerShipsDestroyed = computed(
    () => this.playerShips().filter((ship) => ship.hits.size === ship.size).length,
  );

  aiShipsDestroyed = computed(
    () => this.aiShips().filter((ship) => ship.hits.size === ship.size).length,
  );

  totalPlayerShips = computed(() => this.SHIPS.reduce((sum, s) => sum + s.count, 0));

  totalAIShips = computed(() => this.SHIPS.reduce((sum, s) => sum + s.count, 0));

  private shipIdCounter = 0;

  initializeGame() {
    this.playerBoard.set(new Map());
    this.aiBoard.set(new Map());
    this.aiVisibleBoard.set(new Map());
    this.playerHits.set(0);
    this.playerMisses.set(0);
    this.aiHits.set(0);
    this.aiMisses.set(0);
    this.playerTurn.set(true);
    this.gameOver.set(false);
    this.winner.set(null);

    // Initialize cells
    const playerMap = new Map<string, CellState>();
    const aiMap = new Map<string, CellState>();
    const aiVisibleMap = new Map<string, CellState>();

    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        const key = `${i},${j}`;
        playerMap.set(key, CellState.Empty);
        aiMap.set(key, CellState.Empty);
        aiVisibleMap.set(key, CellState.Unknown);
      }
    }

    this.playerBoard.set(playerMap);
    this.aiBoard.set(aiMap);
    this.aiVisibleBoard.set(aiVisibleMap);

    // Place AI ships
    this.generateAIShips();
  }

  private generateAIShips() {
    const ships: Ship[] = [];

    for (const shipConfig of this.SHIPS) {
      for (let count = 0; count < shipConfig.count; count++) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 50) {
          const horizontal = Math.random() > 0.5;
          const x = Math.floor(Math.random() * this.BOARD_SIZE);
          const y = Math.floor(Math.random() * this.BOARD_SIZE);

          if (this.canPlaceShip(x, y, shipConfig.size, horizontal, this.aiBoard())) {
            const ship = this.createShip(x, y, shipConfig.size, horizontal);
            ships.push(ship);
            this.placeShip(ship, this.aiBoard());
            placed = true;
          }

          attempts++;
        }
      }
    }

    this.aiShips.set(ships);
  }

  private canPlaceShip(
    x: number,
    y: number,
    size: number,
    horizontal: boolean,
    board: Map<string, CellState>,
  ): boolean {
    if (horizontal) {
      if (y + size > this.BOARD_SIZE) return false;
    } else {
      if (x + size > this.BOARD_SIZE) return false;
    }

    for (let i = 0; i < size; i++) {
      const checkX = horizontal ? x : x + i;
      const checkY = horizontal ? y + i : y;
      const key = `${checkX},${checkY}`;

      if (board.get(key) !== CellState.Empty) return false;

      // Check surrounding cells
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const neighborKey = `${checkX + dx},${checkY + dy}`;
          if (board.has(neighborKey) && board.get(neighborKey) === CellState.Ship) {
            return false;
          }
        }
      }
    }

    return true;
  }

  private createShip(x: number, y: number, size: number, horizontal: boolean): Ship {
    return {
      id: this.shipIdCounter++,
      x,
      y,
      horizontal,
      size,
      hits: new Set(),
    };
  }

  private placeShip(ship: Ship, board: Map<string, CellState>) {
    for (let i = 0; i < ship.size; i++) {
      const cellX = ship.horizontal ? ship.x : ship.x + i;
      const cellY = ship.horizontal ? ship.y + i : ship.y;
      board.set(`${cellX},${cellY}`, CellState.Ship);
    }
  }

  playerAttack(x: number, y: number): boolean {
    const key = `${x},${y}`;
    const result = this.aiBoard().get(key);

    if (!result || result === CellState.Hit || result === CellState.Miss) {
      return false; // Already attacked
    }

    if (result === CellState.Ship) {
      this.aiBoard().set(key, CellState.Hit);
      this.aiVisibleBoard().set(key, CellState.Hit);
      this.playerHits.update((v) => v + 1);
      this.markShipHit(key, this.aiShips());
    } else {
      this.aiBoard().set(key, CellState.Miss);
      this.aiVisibleBoard().set(key, CellState.Miss);
      this.playerMisses.update((v) => v + 1);
    }

    this.checkGameOver();
    if (!this.gameOver()) {
      this.playerTurn.set(false);
      setTimeout(() => this.aiAttack(), 1000);
    }

    return true;
  }

  private aiAttack() {
    let x = Math.floor(Math.random() * this.BOARD_SIZE);
    let y = Math.floor(Math.random() * this.BOARD_SIZE);

    while (
      this.playerBoard().get(`${x},${y}`)?.includes('hit') ||
      this.playerBoard().get(`${x},${y}`)?.includes('miss')
    ) {
      x = Math.floor(Math.random() * this.BOARD_SIZE);
      y = Math.floor(Math.random() * this.BOARD_SIZE);
    }

    const key = `${x},${y}`;
    const result = this.playerBoard().get(key);

    if (result === CellState.Ship) {
      this.playerBoard().set(key, CellState.Hit);
      this.aiHits.update((v) => v + 1);
      this.markShipHit(key, this.playerShips());
    } else {
      this.playerBoard().set(key, CellState.Miss);
      this.aiMisses.update((v) => v + 1);
    }

    this.checkGameOver();
    this.playerTurn.set(true);
  }

  private markShipHit(key: string, ships: Ship[]) {
    const [x, y] = key.split(',').map(Number);
    const ship = ships.find((s) => {
      for (let i = 0; i < s.size; i++) {
        const cellX = s.horizontal ? s.x : s.x + i;
        const cellY = s.horizontal ? s.y + i : s.y;
        if (cellX === x && cellY === y) return true;
      }
      return false;
    });

    if (ship) {
      ship.hits.add(key);
    }
  }

  private checkGameOver() {
    if (this.playerShipsDestroyed() === this.totalPlayerShips()) {
      this.gameOver.set(true);
      this.winner.set('ai');
    } else if (this.aiShipsDestroyed() === this.totalAIShips()) {
      this.gameOver.set(true);
      this.winner.set('player');
    }
  }

  resetGame() {
    this.shipIdCounter = 0;
    this.playerShips.set([]);
    this.aiShips.set([]);
    this.initializeGame();
  }
}
