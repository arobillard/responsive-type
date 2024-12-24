import { apply_classes } from '@/helpers/styling';
import button from './button.module.css';
import Link from 'next/link';

export default function Button({
  children,
  className,
  color,
  outline,
  paddingSubtle,
  onClick,
  style,
  href,
}) {
  const class_list = [button.button];

  if (className) class_list.push(className);
  if (outline) class_list.push(button.button_outline);
  if (color) class_list.push(button[`button_${color}`]);
  if (paddingSubtle) class_list.push(button.button_paddingSubtle);

  if (href) {
    return (
      <Link
        href={href}
        style={style}
        className={apply_classes(class_list)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={style}
      className={apply_classes(class_list)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
