import { useState } from 'react';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';
import fontSizeCopyLine from './fontSizeCopyLine.module.css';

export default function FontSizeCopyLine({ tag, font_size }) {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);

  const cssCode = `font-size: ${font_size};`;

  function copyCSSCode() {
    navigator.clipboard.writeText(cssCode);

    setHasBeenCopied(true);

    setTimeout(() => {
      setHasBeenCopied(false);
    }, 2000);
  }

  return (
    <div className={fontSizeCopyLine.fontSizeCopyLine}>
      <code className={fontSizeCopyLine.fontSizeCopyLine_code}>{tag}</code>
      <code className={fontSizeCopyLine.fontSizeCopyLine_code}>{cssCode}</code>
      <button
        className={`${fontSizeCopyLine.fontSizeCopyLine_copy}${
          hasBeenCopied ? ` ${fontSizeCopyLine.fontSizeCopyLine_copied}` : ''
        }`}
        onClick={copyCSSCode}
      >
        <i
          className={`material-symbols-outlined ${fontSizeCopyLine.fontSizeCopyLine_icon}`}
          aria-hidden="true"
        >
          {hasBeenCopied ? 'check_circle' : 'content_paste'}
        </i>
        <ScreenReaderText>Copy {tag} font-size CSS code</ScreenReaderText>
      </button>
    </div>
  );
}
