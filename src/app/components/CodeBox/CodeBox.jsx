import {
  generateClampStyles,
  generateMQStyles,
  generateStyles,
} from '@/helpers/scales';
import codeBox from './codeBox.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function CodeBox() {
  const [settings] = useSettings();

  const {
    usingMediaQueries,
    scalingType,
    lowerScale,
    upperScale,
    mediaQueries,
    includeH6,
    extraSteps,
    asVariables,
  } = settings;

  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  const [outputCode, setOutputCode] = useState(``);

  function copyCSSCode() {
    navigator.clipboard.writeText(outputCode);

    setHasBeenCopied(true);

    setTimeout(() => {
      setHasBeenCopied(false);
    }, 2000);
  }

  useEffect(() => {
    if (usingMediaQueries) {
      setOutputCode(
        generateMQStyles(mediaQueries, includeH6, extraSteps, asVariables)
      );
    } else {
      setOutputCode(
        generateClampStyles(
          lowerScale,
          upperScale,
          scalingType,
          includeH6,
          extraSteps,
          asVariables
        )
      );
    }
  }, [
    usingMediaQueries,
    lowerScale,
    upperScale,
    scalingType,
    mediaQueries,
    includeH6,
    extraSteps,
    asVariables,
  ]);

  return (
    <section className={codeBox.codeBox}>
      <div className={codeBox.codeBox_header}>
        <h2 className={codeBox.codeBox_title}>
          <span className="word_highlight word_highlight--dark">CSS Code</span>
        </h2>
        <Button outline onClick={copyCSSCode} hoverSuccess={hasBeenCopied}>
          <i className={`material-symbols-outlined`} aria-hidden="true">
            {hasBeenCopied ? 'check_circle' : 'content_paste'}
          </i>
          Copy Code
        </Button>
      </div>
      <pre className={codeBox.pre}>
        <code>{outputCode}</code>
      </pre>
    </section>
  );
}
