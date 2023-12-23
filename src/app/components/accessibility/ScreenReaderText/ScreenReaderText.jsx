import screenReaderText from './screenReaderText.module.css';

export default function ScreenReaderText({ children }) {
  return <span className={screenReaderText.screenReaderText}>{children}</span>;
}
