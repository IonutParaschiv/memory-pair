
import { useGameData } from "../hooks/useGameData";
import { GridContainer } from "../layouts/GridContainer";
import { Button } from "./Button";
import { Card } from "./Card"

export const CardContainer =  () => {
  const { gameData, flipCard, resetData } = useGameData();

  return (
      !gameData ? 
      (<div>Loading...</div>) : 
      (
        <>
        <Button text="Start a new game" onClick={resetData}/>
        <GridContainer>
          {gameData.map(({ id, type, isFlipped, isMatched }) => (
            <Card 
              key={id} 
              id={id} 
              type={type} 
              flipped={isFlipped} 
              matched={isMatched}
              onClick={(id) => flipCard(id)}
            />
          ))}
        </GridContainer>
        </>
      )
  )
}