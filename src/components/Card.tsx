
import styled, { css, keyframes } from 'styled-components'
import { icons, QuestionMarkIcon } from '../assets/icons'
import { FC } from 'react'
import { CardType } from '../types/game'

const FLIP_TRANSIOTION_DURATION = 0.6

const spin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`

const CardContainer = styled.div`
  perspective: 1000px;
  width: 10em;
  height: 6.5em;
`

const CardInner = styled.div<{ $flipped: boolean, $shuffling: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform ${FLIP_TRANSIOTION_DURATION}s;
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'none')};
  cursor: pointer;
  ${({ $shuffling }) =>
    $shuffling &&
    css`
      animation: ${spin} .5s linear infinite;
    `}
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

const CardBack = styled(CardFace)<{ $matched?: boolean }>`
  background-color:${({ $matched }) => ($matched ? '#27ae60' : '#3498db')}; );
  transition: background-color .9s ease;
  transition-delay: ${FLIP_TRANSIOTION_DURATION}s;
  color: white;
  transform: rotateY(180deg);
`
type CardProps = {
  id: number,
  type: CardType,
  flipped: boolean,
  matched: boolean,
  shuffling: boolean
  onClick: (id: number) => void,
}

export const Card = (props: CardProps) => {
  const { id, type, onClick, flipped, matched, shuffling } = props
  const Icon:FC = icons[type] || QuestionMarkIcon
  return (
    <CardContainer onClick={() => onClick(id)}>
      <CardInner $flipped={flipped} $shuffling={shuffling}>
        <CardFront>
          <QuestionMarkIcon/>
        </CardFront>
        <CardBack $matched={matched}>
          <Icon/>
        </CardBack>
      </CardInner>
    </CardContainer>
  )
}
