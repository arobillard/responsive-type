import {
  defaultHeadings,
  generateClampedFontSize,
  generateFontSizeByScale,
  generateStyles,
} from '@/helpers/scales';
import codeBox from './codeBox.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';

export default function CodeBox({
  usingMediaQueries,
  scalingType,
  lowerScale,
  upperScale,
  mediaQueries,
}) {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  const [outputCode, setOutputCode] = useState(``);

  function copyCSSCode() {
    navigator.clipboard.writeText(outputCode);

    setHasBeenCopied(true);

    setTimeout(() => {
      setHasBeenCopied(false);
    }, 2000);
  }

  // function generateClampHeadings() {

  // }

  useEffect(() => {
    const generatedStyles = generateStyles(
      usingMediaQueries,
      lowerScale,
      upperScale,
      scalingType,
      mediaQueries
    );

    setOutputCode(generatedStyles);
  }, [usingMediaQueries, lowerScale, upperScale, scalingType, mediaQueries]);

  return (
    <section className={codeBox.codeBox}>
      <h2 className={codeBox.codeBox_title}>
        <span className="word_highlight word_highlight--dark">CSS Code</span>
      </h2>
      <Button outline onClick={copyCSSCode}>
        <i className={`material-symbols-outlined`} aria-hidden="true">
          {hasBeenCopied ? 'check_circle' : 'content_paste'}
        </i>
        Copy Code
      </Button>
      <pre className={codeBox.pre}>
        <code>{outputCode}</code>
      </pre>
    </section>
  );
}
