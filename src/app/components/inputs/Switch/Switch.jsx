import styles from './switch.module.css';

export default function Switch({ name, label, onChange, checked }) {
  return (
    <div className={styles.switch}>
      <label className={styles.switch_label} htmlFor={name}>
        {label}
        <div
          className={`${styles.switch_wrap}${
            checked ? ` ${styles.switch_checked}` : ''
          }`}
        >
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
