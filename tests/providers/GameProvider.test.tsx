import { CardType, GameCardCollection } from '../../src/types/game';
import * as apiHook from '../../src/hooks/useApi';
import * as GameService from '../../src/services/GameService';
import { useContext } from 'react';
import { GameContext } from '../../src/providers/GameProvider';
import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithGameContext } from '../test-utils/renderWithGameContext';

const mockCards: GameCardCollection = [
  { id: 1, type: CardType.Bird, isFlipped: false, isMatched: false },
  { id: 2, type: CardType.Cat, isFlipped: false, isMatched: false },
  { id: 3, type: CardType.Cat, isFlipped: false, isMatched: false },
  { id: 4, type: CardType.Frog, isFlipped: false, isMatched: false },
];

jest.spyOn(apiHook, 'useApi').mockReturnValue({
  data: [{ id: 0, type: 'cat' }],
  loadData: jest.fn(),
});

jest.spyOn(GameService, 'mapGameData').mockReturnValue(mockCards);
jest.useFakeTimers();

const MockComponent = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('Missing GameProvider');

  const { gameData, flipCard, flippedCards, canFlip } = context;
  return (
    <>
      <div data-testid="flipped-count">{flippedCards}</div>
      <div data-testid="can-flip">{canFlip ? 'true' : 'false'}</div>
      {gameData?.map(card => (
        <button key={card.id} onClick={() => flipCard(card.id)} data-testid={`card-${card.id}`}>
          {card.type} - {card.isFlipped ? 'flipped' : 'unflipped'}
        </button>
      ))}
    </>
  );
};

describe('GameProvider', () => {
  it('flips a card and resets after', () => {
    renderWithGameContext(<MockComponent />);
    const card1 = screen.getByTestId('card-1');
    act(() => {
      fireEvent.click(card1);
    });
    expect(card1).toHaveTextContent('bird - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('1');
  });

  it('locks the game when two cards are flipped', () => {
    renderWithGameContext(<MockComponent />);
    const card1 = screen.getByTestId('card-1');
    const card2 = screen.getByTestId('card-2');

    act(() => {
      fireEvent.click(card1);
    });
    expect(card1).toHaveTextContent('bird - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('1');
    expect(screen.getByTestId('can-flip')).toHaveTextContent('true');

    act(() => {
      fireEvent.click(card2);
    });
    expect(card2).toHaveTextContent('cat - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('2');
    expect(screen.getByTestId('can-flip')).toHaveTextContent('false');
  });

  it('flips two cards and resets after timeout if there is no match', () => {
    renderWithGameContext(<MockComponent />);
    const card1 = screen.getByTestId('card-1');
    const card2 = screen.getByTestId('card-2');

    act(() => {
      fireEvent.click(card1);
      fireEvent.click(card2);
    });

    expect(card1).toHaveTextContent('bird - flipped');
    expect(card2).toHaveTextContent('cat - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('2');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(card1).toHaveTextContent('bird - unflipped');
    expect(card2).toHaveTextContent('cat - unflipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('0');
  });

  it('flips two cards and keeps them flipped if there is a match', () => {
    renderWithGameContext(<MockComponent />);
    const card1 = screen.getByTestId('card-2');
    const card2 = screen.getByTestId('card-3');

    act(() => {
      fireEvent.click(card1);
      fireEvent.click(card2);
    });

    expect(card1).toHaveTextContent('cat - flipped');
    expect(card2).toHaveTextContent('cat - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('2');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(card1).toHaveTextContent('cat - flipped');
    expect(card2).toHaveTextContent('cat - flipped');
    expect(screen.getByTestId('flipped-count')).toHaveTextContent('2');
  });
});
