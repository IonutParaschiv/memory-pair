import { styled } from 'styled-components';

const StyledButton = styled.button`
  width: 40%;
  padding: 0.75em 1.25em;
  font-size: 1rem;
  font-weight: 900;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  margin: 1.5em 0;
  &:hover {
    background-color: #45a047;
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};
export const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
