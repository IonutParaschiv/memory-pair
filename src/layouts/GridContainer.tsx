import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: .5em;
  padding: 1em;
  border-radius: 0.5em;
  outline: 1px solid white;
`