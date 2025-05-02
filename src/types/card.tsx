export type CardType = string
export type Card = {
  id: number;
  type: CardType;
}

export type CardCollection = Card[]

export type CardCollectionResponse = {
  status: number;
  response: 'ok' | 'error';
  data: CardCollection;
}