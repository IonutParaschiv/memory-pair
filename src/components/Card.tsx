
import styled from 'styled-components'
import { QuestionMarkIcon } from '../assets/icons'

const CardContainer = styled.div`
  perspective: 1000px;
  width: 12em;
  height: 8em;
`

const CardInner = styled.div<{ flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'none')};
  cursor: pointer;
`

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  box-shadow: 0 0.125em 0.375em rgba(0, 0, 0, 0.1);
`

const CardFront = styled(CardFace)`
  background-color: #ffffff;
`

const CardBack = styled(CardFace)`
  background-color: #0077ff;
  color: white;
  transform: rotateY(180deg);
`
type CardProps = {
  id: number,
  type: string,
  onClick: (id: number) => void,
  flipped: boolean,
}

export const Card = (props: CardProps) => {

  const { id, type, onClick, flipped } = props
  return (
    <CardContainer onClick={() => onClick(id)}>
      <CardInner flipped={flipped}>
        <CardFront>
          <QuestionMarkIcon />
        </CardFront>
        <CardBack>
          <div>
            <h2>{type}</h2>
          </div>
        </CardBack>
      </CardInner>
    </CardContainer>
  )
}
