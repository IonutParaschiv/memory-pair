
export type ApiCard = {
  id: number;
  type: string;
}
export type CardCollection = ApiCard[]

export type CardCollectionResponse = {
  status: number;
  response: 'ok' | 'error';
  data: CardCollection;
}
