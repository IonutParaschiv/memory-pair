import { CardCollection } from '../../src/types/data';
import { isCardType, mapGameData, parseCard, shuffleGameData } from '../../src/services/GameService';
import { CardType, GameCardCollection } from '../../src/types/game';
describe('GameService', () => {
  describe('mapGameData', () => {
    it('should map and shuffle card data correctly', () => {
      const cardData: CardCollection = [
        { id: 1, type: CardType.Bird },
        { id: 2, type: CardType.Cat },
      ];

      const gameData = mapGameData(cardData);

      expect(gameData).toHaveLength(4);
      expect(gameData.filter(card => card.type === CardType.Bird).length).toBe(2);
      expect(gameData.filter(card => card.type === CardType.Cat).length).toBe(2);
    });

    it('should throw an error for invalid card type', () => {
      const cardData: CardCollection = [{ id: 1, type: 'invalidType' }];
      expect(() => mapGameData(cardData)).toThrowError('Invalid card type: invalidType');
    });
  });

  describe('shuffleGameData', () => {
    it('outputs the same shuffled array for the same inputs (is deterministic)', () => {
      const cardData: GameCardCollection = [
        { id: 0, type: CardType.Bird, isFlipped: false, isMatched: false },
        { id: 1, type: CardType.Cat, isFlipped: false, isMatched: false },
        { id: 2, type: CardType.Chameleon, isFlipped: false, isMatched: false },
        { id: 3, type: CardType.Clam, isFlipped: false, isMatched: false },
      ];

      const SEED = 123;
      const firstShuffle = shuffleGameData(cardData, SEED);
      const secondShuffle = shuffleGameData(cardData, SEED);

      expect(firstShuffle).toEqual(secondShuffle);
    });
    it('outputs different shuffled arrays for different inputs', () => {
      const cardData: GameCardCollection = [
        { id: 0, type: CardType.Bird, isFlipped: false, isMatched: false },
        { id: 1, type: CardType.Cat, isFlipped: false, isMatched: false },
        { id: 2, type: CardType.Chameleon, isFlipped: false, isMatched: false },
        { id: 3, type: CardType.Clam, isFlipped: false, isMatched: false },
      ];

      const firstShuffle = shuffleGameData(cardData, 123);
      const secondShuffle = shuffleGameData(cardData, 456);

      expect(firstShuffle).not.toEqual(secondShuffle);
    });
  });

  describe('isCardType', () => {
    it('should return true for valid card types', () => {
      expect(isCardType(CardType.Bird)).toBe(true);
      expect(isCardType(CardType.Cat)).toBe(true);
    });

    it('should return false for invalid card types', () => {
      expect(isCardType('invalidType')).toBe(false);
    });
  });

  describe('parseCard', () => {
    it('should parse a valid card', () => {
      const rawCard = { id: 1, type: 'bird' };
      const parsedCard = parseCard(rawCard);
      expect(parsedCard.type).toBe(CardType.Bird);
    });

    it('should throw an error for invalid card type', () => {
      const rawCard = { id: 1, type: 'invalidType' };
      expect(() => parseCard(rawCard)).toThrowError('Invalid card type: invalidType');
    });
  });
});
