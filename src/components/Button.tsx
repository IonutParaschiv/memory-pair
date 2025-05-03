
type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
export const Button = ({ text, onClick, disabled = false } : ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#ccc' : '#0077ff',
        color: '#fff',
        border: 'none',
        borderRadius: '0.5em',
        padding: '0.5em 1em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1em',
        boxShadow: '0 0.125em 0.375em rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
      }}>
        {text}
      </button>
  )
}