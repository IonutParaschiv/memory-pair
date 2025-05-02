import { useEffect } from "react";
import { useGameData } from "../providers/GameProvider";
import { Card } from "./Card"

export const CardContainer =  () => {
  const { gameData, flipCard } = useGameData();
  const cardClickHandler = (id: number) => {
    flipCard(id);
  }

  // TODO: remove this console log
  // It's only for debugging purposes
  useEffect(() => {
    console.log('CardContainer is getting rendered');
  }, [])

  return (
      !gameData ? 
      (<div>Loading...</div>) : 
      (
        <>
          {gameData.map(({ id, type, isFlipped }) => (
            <Card 
              key={id} 
              id={id} 
              type={type} 
              flipped={isFlipped} 
              onClick={cardClickHandler}
            />
          ))}
        </>
      )
  )
}