import { render } from '@testing-library/react';
import { GameProvider } from '../../src/providers/GameProvider';

export const renderWithGameContext = (ui: React.ReactNode) => {
  return render(<GameProvider>{ui}</GameProvider>);
}