import { useState, useEffect } from 'react';
import { Card as CardType, GameState } from '@/types';
import Card from './Card';
import { memes } from '@/data/memes';

const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    matchedPairs: 0,
    gameOver: false,
    startTime: null,
    endTime: null,
  });

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstCardId, secondCardId] = gameState.flippedCards;
      const firstCard = gameState.cards.find(card => card.id === firstCardId);
      const secondCard = gameState.cards.find(card => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.imageUrl === secondCard.imageUrl) {
        // Match found
        setTimeout(() => {
          setGameState(prevState => ({
            ...prevState,
            cards: prevState.cards.map(card => 
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isMatched: true }
                : card
            ),
            flippedCards: [],
            matchedPairs: prevState.matchedPairs + 1,
          }));
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setGameState(prevState => ({
            ...prevState,
            cards: prevState.cards.map(card => 
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            ),
            flippedCards: [],
          }));
        }, 1000);
      }
    }
  }, [gameState.flippedCards]);

  // Check for game over
  useEffect(() => {
    if (gameState.matchedPairs === memes.length && gameState.startTime && !gameState.gameOver) {
      setGameState(prevState => ({
        ...prevState,
        gameOver: true,
        endTime: Date.now(),
      }));
    }
  }, [gameState.matchedPairs, gameState.startTime, gameState.gameOver]);

  const initializeGame = () => {
    // Create pairs of cards with meme images
    const cardPairs = memes.flatMap(meme => [
      {
        id: meme.id + 'a',
        imageUrl: meme.url,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: meme.id + 'b',
        imageUrl: meme.url,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    // Shuffle cards
    const shuffledCards = shuffleArray(cardPairs).map((card, index) => ({
      ...card,
      id: index, // Reassign IDs to be numeric for easier handling
    }));

    setGameState({
      cards: shuffledCards,
      flippedCards: [],
      moves: 0,
      matchedPairs: 0,
      gameOver: false,
      startTime: null,
      endTime: null,
    });
  };

  const handleCardClick = (id: number) => {
    // Start timer on first card click
    if (!gameState.startTime) {
      setGameState(prevState => ({
        ...prevState,
        startTime: Date.now(),
      }));
    }

    // Don't allow more than 2 cards to be flipped at once
    if (gameState.flippedCards.length >= 2) return;

    // Don't allow already flipped cards to be clicked again
    if (gameState.cards.find(card => card.id === id)?.isFlipped) return;

    setGameState(prevState => {
      // Flip the card
      const updatedCards = prevState.cards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      );

      // Add to flipped cards and increment moves
      const updatedFlippedCards = [...prevState.flippedCards, id];
      const updatedMoves = updatedFlippedCards.length === 2 
        ? prevState.moves + 1 
        : prevState.moves;

      return {
        ...prevState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards,
        moves: updatedMoves,
      };
    });
  };

  const resetGame = () => {
    initializeGame();
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Calculate game time in seconds
  const getGameTime = (): number => {
    if (!gameState.startTime) return 0;
    const endTime = gameState.endTime || Date.now();
    return Math.floor((endTime - gameState.startTime) / 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">
          Moves: {gameState.moves}
        </div>
        <div className="text-lg font-semibold">
          Time: {getGameTime()} seconds
        </div>
        <button
          onClick={resetGame}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Reset Game
        </button>
      </div>

      {gameState.gameOver && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold">Congratulations!</p>
          <p>You completed the game in {gameState.moves} moves and {getGameTime()} seconds.</p>
        </div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 h-[600px]">
        {gameState.cards.map(card => (
          <div key={card.id} className="aspect-square">
            <Card
              card={card}
              onClick={handleCardClick}
              disabled={gameState.flippedCards.length >= 2 || gameState.gameOver}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;