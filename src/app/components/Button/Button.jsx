import button from './button.module.css';

export default function Button({ children, style, onClick }) {
  return (
    <button
      className={`${button.button}${
        style === 'outline' ? ` ${button.button_outline}` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
