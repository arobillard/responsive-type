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
import EditPreviewText from './EditPreviewText/EditPreviewText';
import Button from '../Button/Button';

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

  return (
    <section id="preview" className={preview.preview}>
      <div className={preview.preview_header}>
        <h2 className={preview.preview_title}>
          <span className="word_highlight">Preview</span>
        </h2>

        <EditPreviewText />
      </div>

      <div className={preview.preview_button_wrap}>
        <Button
          onClick={() => updateSettings({ extraSteps: extraSteps + 1 })}
          outline
          hoverSuccess
        >
          <i className="material-symbols-outlined" aria-hidden="true">
            add_circle
          </i>
          Add step
        </Button>

        {extraSteps > 0 && (
          <Button
            onClick={() => updateSettings({ extraSteps: extraSteps - 1 })}
            outline
            hoverSecondary
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
            outline
            hoverSecondary
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

          if (rules[0]) {
            font_size = rules[0][1];
          }

          return (
            <div key={variableName} className={preview.preview_heading_wrap}>
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
    </section>
  );
}
