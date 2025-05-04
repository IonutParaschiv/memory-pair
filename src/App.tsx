import './App.css';
import { CardContainer } from './components/CardContainer';
import { DataProvider } from './providers/DataProvider';
import { GameProvider } from './providers/GameProvider';

function App() {
  return (
    <DataProvider>
      <GameProvider>
        <CardContainer />
      </GameProvider>
    </DataProvider>
  );
}

export default App;
