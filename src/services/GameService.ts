import { Card, CardCollection } from "../types/card";
import { GameCard } from "../types/game";


// Maps the card data to game data and duplicates each card
// to create pairs for the game
export const mapGameData = (cardData: CardCollection): GameCard[] => {
  let nextId = 0;
  const gameData = cardData.reduce<GameCard[]>((acc, card: Card) => {
    acc.push({
      ...card,
      id: nextId++,
      isFlipped: false,
      isMatched: false
    })
    acc.push({
      ...card,
      id: nextId++,
      isFlipped: false,
      isMatched: false
    })
    return acc
  }, [])
  
  // shuffle the game data
  for (let i = gameData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameData[i], gameData[j]] = [gameData[j], gameData[i]];
  }
  return gameData;
}