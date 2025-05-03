import { ApiCard, CardCollection } from "../types/data";
import { Card, CardType, GameCardCollection } from "../types/game";
import { randomize } from "../utilities/randomizer";


export const isCardType = (value: string): value is CardType => {
  return Object.values(CardType).includes(value as CardType)
}

export const parseCard = (raw: ApiCard): Card => {
  if(!isCardType(raw.type)) {
    throw new Error(`Invalid card type: ${raw.type}`);
  }
  return {
    id: raw.id,
    type: raw.type as CardType
  }
}

export const shuffleGameData = (gameData: GameCardCollection, seed: number): GameCardCollection => {
  const rand = randomize(seed);
  const copy = [...gameData];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Maps the card data to game data and duplicates each card
// to create pairs for the game
export const mapGameData = (cardData: CardCollection):GameCardCollection => {
  let nextId = 0;
  const cards = cardData.map(parseCard);
  const gameData = cards.reduce<GameCardCollection>((acc, card: Card) => {
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
  const shuffled = shuffleGameData(gameData, Math.random() * 1000);
  return shuffled
}
