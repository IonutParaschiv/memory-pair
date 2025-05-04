export enum CardType {
  Rabbit = 'rabbit',
  Cat = 'cat',
  Jellyfish = 'jellyfish',
  Chameleon = 'chameleon',
  Fish = 'fish',
  Snake = 'snake',
  Frog = 'frog',
  Clam = 'clam',
  Pig = 'pig',
  Turtle = 'turtle',
  Elephant = 'elephant',
  Squirrel = 'squirrel',
  Boar = 'boar',
  Bird = 'bird',
  Grasshopper = 'grasshopper',
}

export type Card = {
  id: number;
  type: CardType;
};

export type GameCard = Card & {
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameCardCollection = GameCard[];
