import { generateClampStyles, generateMQStyles } from '@/helpers/scales';
import codeBox from './codeBox.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import CollapseBox from '../CollapseBox/CollapseBox';
import Grid from '../Grid/Grid';

export default function CodeBox() {
  const [settings, updateSettings] = useSettings();

  const {
    usingMediaQueries,
    scalingType,
    lowerScale,
    upperScale,
    mediaQueries,
    includeH6,
    extraSteps,
    asVariables,
    codeBoxOpen,
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

  function setCollapseStatus(status) {
    updateSettings({ codeBoxOpen: status });
  }

  return (
    <section id="code">
      <CollapseBox
        heading={{ text: 'Code', icon: 'code' }}
        defaultExpanded={codeBoxOpen}
        callBack={setCollapseStatus}
      >
        <Grid
          gap="var(--spacer-m)"
          padding="var(--spacer-m)"
          style={{ position: 'relative' }}
        >
          <Button
            className={codeBox.codeBox_copy_button}
            outline={!hasBeenCopied}
            onClick={copyCSSCode}
            color={hasBeenCopied ? 'success' : 'secondary'}
            paddingSubtle
          >
            <i className={`material-symbols-outlined`} aria-hidden="true">
              {hasBeenCopied ? 'check_circle' : 'content_paste'}
            </i>
            Copy Code
          </Button>
          <pre className={codeBox.pre}>
            <code>{outputCode}</code>
          </pre>
        </Grid>
      </CollapseBox>
    </section>
  );
}
