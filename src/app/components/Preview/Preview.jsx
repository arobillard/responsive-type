import 'material-symbols';
import {
  generateClampStyles,
  generateMQStyles,
  generateRuleSetArray,
} from '@/helpers/scales';
import preview from './preview.module.css';
import Heading from '../Heading';
import FontSizeCopyLine from '../FontSizeCopyLine/FontSizeCopyLine';
import { useEffect, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import Button from '../Button/Button';
import CollapseBox from '../CollapseBox/CollapseBox';
import Grid from '../Grid/Grid';

export default function Preview() {
  const [settings, updateSettings] = useSettings();

  const {
    usingMediaQueries,
    lowerScale,
    upperScale,
    scalingType,
    mediaQueries,
    extraSteps,
    includeH6,
    headingText,
    paragraphText,
    previewOpen,
  } = settings;

  const [styleCode, setStyleCode] = useState(``);
  const [ruleSets, setRuleSets] = useState([]);

  useEffect(() => {
    setRuleSets(
      generateRuleSetArray(
        extraSteps,
        includeH6,
        lowerScale,
        upperScale,
        scalingType
      )
    );
  }, [extraSteps, includeH6, lowerScale, upperScale, scalingType]);

  useEffect(() => {
    const generatedStyles = usingMediaQueries
      ? generateMQStyles(mediaQueries, includeH6, extraSteps, false)
      : generateClampStyles(
          lowerScale,
          upperScale,
          scalingType,
          includeH6,
          extraSteps,
          false
        );

    setStyleCode(generatedStyles);
  }, [
    mediaQueries,
    includeH6,
    extraSteps,
    lowerScale,
    upperScale,
    scalingType,
    usingMediaQueries,
  ]);

  function setCollapseStatus(status) {
    updateSettings({ previewOpen: status });
  }

  return (
    <section id="preview">
      <CollapseBox
        heading={{ text: 'Preview', icon: 'text_fields' }}
        callBack={setCollapseStatus}
        defaultExpanded={previewOpen}
      >
        <Grid gap="var(--spacer-m)" padding="var(--spacer-m)">
          <div className={preview.preview_button_wrap}>
            <Button
              onClick={() => updateSettings({ extraSteps: extraSteps + 1 })}
              paddingSubtle
              color="secondary"
              outline
            >
              <i className="material-symbols-outlined" aria-hidden="true">
                add_circle
              </i>
              Add step
            </Button>

            {extraSteps > 0 && (
              <Button
                onClick={() => updateSettings({ extraSteps: extraSteps - 1 })}
                paddingSubtle
                outline
                color="warning"
              >
                <i className="material-symbols-outlined" aria-hidden="true">
                  delete
                </i>
                Remove step
              </Button>
            )}
            {extraSteps > 1 && (
              <Button
                onClick={() => updateSettings({ extraSteps: 0 })}
                paddingSubtle
                outline
                color="danger"
              >
                <i className="material-symbols-outlined" aria-hidden="true">
                  undo
                </i>
                Reset steps
              </Button>
            )}
          </div>
          <style>
            {`.preview_mediaQuery {
            ${styleCode}
          }`}
          </style>
          <div className={`preview_mediaQuery ${preview.preview_content}`}>
            {ruleSets.map(({ selectors, variableName, rules, step }) => {
              const headingClasses = `${preview.preview_heading} ${selectors[
                selectors.length - 1
              ].replace('.', '')}`;

              const headingStyles = {};

              if (step > 3) {
                headingStyles.lineHeight = '1.1';
              }

              let font_size = null;

              if (rules[0] && !usingMediaQueries) {
                font_size = rules[0][1];
              }

              return (
                <div
                  key={variableName}
                  className={preview.preview_heading_wrap}
                >
                  <FontSizeCopyLine
                    tag={selectors[0]}
                    step={step}
                    font_size={font_size}
                  />
                  <Heading
                    className={headingClasses}
                    tag={selectors[0]}
                    style={headingStyles}
                  >
                    {headingText}
                  </Heading>
                </div>
              );
            })}

            <p>{paragraphText}</p>
          </div>
        </Grid>
      </CollapseBox>
    </section>
  );
}
