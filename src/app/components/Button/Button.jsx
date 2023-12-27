import button from './button.module.css';

export default function Button({ children, secondary, outline, onClick }) {
  return (
    <button
      className={`${button.button}${
        outline ? ` ${button.button_outline}` : ''
      }${secondary ? ` ${button.button_secondary}` : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
