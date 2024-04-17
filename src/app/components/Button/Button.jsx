import button from './button.module.css';

export default function Button({
  children,
  secondary,
  outline,
  paddingSubtle,
  onClick,
}) {
  return (
    <button
      className={`${button.button}${
        outline ? ` ${button.button_outline}` : ''
      }${secondary ? ` ${button.button_secondary}` : ''}${
        paddingSubtle ? ` ${button.button_paddingSubtle}` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
