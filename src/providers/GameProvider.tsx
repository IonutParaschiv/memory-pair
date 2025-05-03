import { createContext, useEffect, useRef, useState } from "react";
import { GameCardCollection } from "../types/game";
import { mapGameData } from "../services/GameService";
import { useApi } from "../hooks/useApi";

type GameContextType = {
  canFlip: boolean;
  flippedCards: number;
  gameData: GameCardCollection | null;
  shuffling: boolean;
  flipCard: (id: number) => void;
  resetData: () => void;
}

const RESET_TIMEOUT = 1000;

export const GameContext = createContext<GameContextType | undefined>(undefined);
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [canFlip, setCanFlip] = useState(true);
  const [flippedCards, setFlippedCards] = useState<number>(0);
  const [gameData, setGameData] = useState<GameCardCollection | null>(null);
  const [shuffling, setShuffling] = useState(false);

  const activeCards = useRef<GameCardCollection>([]);
  const { data } = useApi();

  useEffect(() => {
    if(data.length){
      const gameCards = mapGameData(data);
      setGameData(gameCards);
    }
  }, [data]);

  const resetState = () => {
    setFlippedCards(0);
    setCanFlip(true);
    activeCards.current = [];
  }

  const resetData = () => {
    resetState();
    setShuffling(true);
    const shufflingTimeout = setTimeout(() => {
      setGameData(null);
      setShuffling(false);
      clearTimeout(shufflingTimeout);
      const newCards = mapGameData(data);
      setGameData(newCards);
    }, 2000);
  }

  const resetFlippedCards = () => {
    resetState();
    setGameData((prevGameData) =>
      prevGameData?.map((card) => 
        !card.isMatched ? ({ ...card, isFlipped: false }) : card) || null
    );
  }

  const flipCard = (id: number) => {
    if (!canFlip || !gameData) return;

    // Avoid flipping already flipped/matched cards
    const clickedCard = gameData.find((card) => card.id === id)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

    setGameData((prevGameData) =>
      prevGameData?.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      ) || null
    );

    activeCards.current.push(clickedCard);
    if(activeCards.current.length === 2) {
      const [firstCard, secondCard] = activeCards.current
      setCanFlip(false);

      if(firstCard.type === secondCard.type) {
        setGameData((prevGameData) =>
          prevGameData?.map((card) =>
            card.type === firstCard.type
              ? { ...card, isFlipped: true, isMatched: true }
              : card
          ) || null
        );
        setTimeout(() => {
          activeCards.current = [];
          setCanFlip(true);
        }, 500);
      } else {
        setTimeout(() => {
          resetFlippedCards();
          activeCards.current = [];
        }, RESET_TIMEOUT);
      }
    }
    setFlippedCards((prevCount) => prevCount + 1);
    
  }

  return (
    <GameContext.Provider value={{ canFlip, flippedCards, gameData, shuffling, flipCard, resetData }}>
      {children}
    </GameContext.Provider>
  );
};