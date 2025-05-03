import { createContext, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useApi } from "./DataProvider";
import { GameCardCollection } from "../types/game";
import { mapGameData } from "../services/GameService";

type GameContextType = {
  canFlip: boolean;
  flippedCards: number;
  gameData: GameCardCollection | null;
  flipCard: (id: number) => void;
  resetData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);
const RESET_TIMEOUT = 1000;

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [canFlip, setCanFlip] = useState(true);
  const [flippedCards, setFlippedCards] = useState<number>(0);
  const [gameData, setGameData] = useState<GameCardCollection | null>(null);

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
    setGameData(null);

    const newCards = mapGameData(data);
    setGameData(newCards);
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
    <GameContext.Provider value={{ canFlip, flippedCards, gameData, flipCard, resetData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameData = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}