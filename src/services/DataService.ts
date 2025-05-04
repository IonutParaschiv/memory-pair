import { CardCollectionResponse } from '../types/data';
import { mockCardData } from '../../data/mockData/cardData';

// Simulate a network request to fetch card data
// This function returns a promise that resolves after 500ms
export const fetchCardData = (): Promise<CardCollectionResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const response: CardCollectionResponse = { status: 200, response: 'ok', data: mockCardData };
      resolve(response);
    }, 500);
  });
};
