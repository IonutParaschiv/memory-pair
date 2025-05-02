import './App.css'
import { CardContainer } from './components/CardContainer'
import { GridContainer } from './layouts/GridContainer'
import { DataProvider } from './providers/DataProvider'
import { GameProvider } from './providers/GameProvider'

function App() {

  return (
    <GridContainer>
      <DataProvider>
        <GameProvider>
          <CardContainer/>
        </GameProvider>
      </DataProvider>
    </GridContainer>
  )
}

export default App
