
import { useGameData } from "../hooks/useGameData";
import { GameGridContainer } from "../layouts/GameGridContainer";
import { RowContainer } from "../layouts/RowContainer";
import { Button } from "./Button";
import { Card } from "./Card"
import { Title } from "./Title";

export const CardContainer =  () => {
  const { gameData, flipCard, resetData, shuffling } = useGameData();
  if (!gameData) return <div>Loading...</div>

  return (
    <>
      <RowContainer>
        <Title>ZooFlip</Title>
      </RowContainer>
      <RowContainer>
        <GameGridContainer>
          {gameData.map(({ id, type, isFlipped, isMatched }) => (
            <Card 
              key={id} 
              id={id} 
              type={type} 
              flipped={isFlipped} 
              matched={isMatched}
              shuffling={shuffling}
              onClick={(id) => flipCard(id)}
            />
          ))}
        </GameGridContainer>
      </RowContainer>
      <RowContainer>
        <Button onClick={resetData}>Start a new game</Button>
      </RowContainer>
    </>
  )
}