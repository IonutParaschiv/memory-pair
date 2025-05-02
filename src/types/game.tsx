import { Card } from "./card";

export type GameCard = Card & {
  isFlipped: boolean;
  isMatched: boolean;
}