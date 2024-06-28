import { useEffect, useState } from 'react';
import styles from './switch.module.css';

export default function Switch({ name, label, onChange, checked }) {
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
      <label className={styles.switch_label} htmlFor={name}>
        {label}
        <div className={classNames}>
          <span className={styles.switch_bar}></span>
          <span className={styles.switch_toggle}></span>
        </div>
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
