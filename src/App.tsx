import './App.css';
import { MainContainer } from './components/MainContainer';
import { DataProvider } from './providers/DataProvider';
import { GameProvider } from './providers/GameProvider';

function App() {
  return (
    <DataProvider>
      <GameProvider>
        <MainContainer />
      </GameProvider>
    </DataProvider>
  );
}

export default App;
