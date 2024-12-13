import { apply_classes } from '@/helpers/styling';
import button from './button.module.css';
import Link from 'next/link';

export default function Btn({
  children,
  href,
  secondary,
  outline,
  paddingSubtle,
  hoverSuccess,
  onClick,
  style,
}) {
  const class_list = [button.button];

  if (outline) class_list.push(button.button_outline);
  if (secondary) class_list.push(button.button_secondary);
  if (paddingSubtle) class_list.push(button.button_paddingSubtle);
  if (hoverSuccess) class_list.push(button.button_hoverSuccess);

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
