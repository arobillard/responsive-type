import { useState } from 'react';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';
import fontSizeCopyLine from './fontSizeCopyLine.module.css';
import { useSettings } from '@/context/SettingsContext';

export default function FontSizeCopyLine({ tag, font_size, step }) {
  const [settings] = useSettings();
  const { extraSteps, includeH6, asVariables } = settings;
  const [varHasBeenCopied, setVarHasBeenCopied] = useState(false);
  const [codeHasBeenCopied, setCodeHasBeenCopied] = useState(false);

  const cssCode = `font-size: ${font_size};`;

  let label = tag;

  if (tag === 'div') {
    const amount = includeH6 ? step - 6 : step - 5;

    label = '';

    for (let i = 0; i < amount; i++) {
      label = `${label}x`;
    }

    label = `${label}l`;
  }

  if (tag === 'h6' && !includeH6) {
    label = 'base';
  }

  function copyCSSCode() {
    navigator.clipboard.writeText(`font-size: ${font_size};`);

    setCodeHasBeenCopied(true);

    setTimeout(() => {
      setCodeHasBeenCopied(false);
    }, 2000);
  }

  function copyCSSVariable() {
    navigator.clipboard.writeText(`font-size: var(--type-scale-${label});`);

    setVarHasBeenCopied(true);

    setTimeout(() => {
      setVarHasBeenCopied(false);
    }, 2000);
  }

  return (
    <div className={fontSizeCopyLine.fontSizeCopyLine}>
      {/* <button
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
        <ScreenReaderText>
          Copy step {step} {asVariables ? 'variable' : 'font-size CSS code'}
        </ScreenReaderText>
      </button> */}
      <code className={fontSizeCopyLine.fontSizeCopyLine_code}>
        {tag === 'h6' ? tag : label}
      </code>
      {asVariables && (
        <button
          className={`${fontSizeCopyLine.fontSizeCopyLine_copy}${
            varHasBeenCopied
              ? ` ${fontSizeCopyLine.fontSizeCopyLine_copied}`
              : ''
          }`}
          onClick={copyCSSVariable}
        >
          <code className={fontSizeCopyLine.fontSizeCopyLine_code}>
            --type-scale-{label}
          </code>
        </button>
      )}
      <button
        className={`${fontSizeCopyLine.fontSizeCopyLine_copy}${
          codeHasBeenCopied
            ? ` ${fontSizeCopyLine.fontSizeCopyLine_copied}`
            : ''
        }`}
        onClick={copyCSSCode}
      >
        <code className={fontSizeCopyLine.fontSizeCopyLine_code}>
          {cssCode}
        </code>
      </button>
    </div>
  );
}
