import styled from 'styled-components';

export const GameGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5em;
  padding: 1em;
  border-radius: 0.5em;
  outline: 1px solid grey;
  margin-top: 1em;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
