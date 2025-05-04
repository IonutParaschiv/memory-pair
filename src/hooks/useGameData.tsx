import { useContext } from 'react';
import { GameContext } from '../providers/GameProvider';

export const useGameData = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
