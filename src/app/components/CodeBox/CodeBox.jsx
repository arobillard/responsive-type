import {
  defaultHeadings,
  generateClampedFontSize,
  generateFontSizeByScale,
} from '@/helpers/scales';
import codeBox from './codeBox.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

export default function CodeBox({
  usingMediaQueries,
  scalingType,
  lowerScale,
  upperScale,
}) {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  let outputCode = ``;

  function copyCSSCode() {
    navigator.clipboard.writeText(outputCode);

    setHasBeenCopied(true);

    setTimeout(() => {
      setHasBeenCopied(false);
    }, 2000);
  }

  defaultHeadings.forEach((heading) => {
    outputCode =
      outputCode +
      `

${heading.tag} {
  font-size: ${generateClampedFontSize(
    lowerScale,
    upperScale,
    scalingType,
    heading.step
  )};
}
`;
  });
  return (
    <section className={codeBox.codeBox}>
      <h2>CSS Code</h2>
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
