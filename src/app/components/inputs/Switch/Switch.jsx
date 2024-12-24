import { useEffect, useState } from 'react';
import styles from './switch.module.css';

export default function Switch({
  name,
  label,
  labelRight,
  noSpread,
  onChange,
  checked,
}) {
  const [classNames, setClassNames] = useState(styles.switch_wrap);

  useEffect(() => {
    setClassNames(
      checked
        ? `${styles.switch_wrap} ${styles.switch_checked}`
        : styles.switch_wrap
    );
  }, [checked]);

  return (
    <div className={styles.switch}>
      <label
        className={`${styles.switch_label}${
          noSpread ? ` ${styles.switch_label_no_spread}` : ''
        }`}
        htmlFor={name}
      >
        {!labelRight && label}
        <div className={classNames}>
          <span className={styles.switch_toggle}></span>
        </div>
        {labelRight && label}
      </label>
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}
