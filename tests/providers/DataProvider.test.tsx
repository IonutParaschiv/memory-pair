import { useContext } from 'react';
import { DataContext, DataProvider } from '../../src/providers/DataProvider';
import { CardCollection } from '../../src/types/data';
import * as DataService from '../../src/services/DataService';
import { render, screen, waitFor } from '@testing-library/react';

const mockData: CardCollection = [
  { id: 1, type: 'fruit' },
  { id: 2, type: 'vegetable' },
];

jest.spyOn(DataService, 'fetchCardData').mockResolvedValue({
  status: 200,
  response: 'ok',
  data: mockData,
});

const MockComponent = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('Missing DataProvider');
  return (
    <>
      <p>Number of cards is: {context.data.length}</p>
    </>
  );
};

describe('DataProvider', () => {
  it('loads data on mount', async () => {
    render(
      <DataProvider>
        <MockComponent />
      </DataProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Number of cards is: 2')).toBeInTheDocument();
    });
  });
});
