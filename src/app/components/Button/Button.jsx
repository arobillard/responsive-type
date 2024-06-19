import { apply_classes } from '@/helpers/styling';
import button from './button.module.css';

export default function Button({
  children,
  secondary,
  outline,
  paddingSubtle,
  hoverSuccess,
  onClick,
}) {
  const class_list = [button.button];

  if (outline) class_list.push(button.button_outline);
  if (secondary) class_list.push(button.button_secondary);
  if (paddingSubtle) class_list.push(button.button_paddingSubtle);
  if (hoverSuccess) class_list.push(button.button_hoverSuccess);

  return (
    <button className={apply_classes(class_list)} onClick={onClick}>
      {children}
    </button>
  );
}
