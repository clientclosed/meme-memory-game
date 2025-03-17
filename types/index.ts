export interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  matchedPairs: number;
  gameOver: boolean;
  startTime: number | null;
  endTime: number | null;
}

export interface MemeData {
  id: string;
  name: string;
  url: string;
}