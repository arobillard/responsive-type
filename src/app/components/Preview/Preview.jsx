import 'material-symbols';
import { generateClampedFontSize, generateStyles } from '@/helpers/scales';
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
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const startingNum = includeH6 ? 6 : 5;

    const updatedHeadings = [];

    for (let i = 0; i < startingNum + extraSteps; i++) {
      updatedHeadings.push({
        tag: startingNum - i > 0 ? `h${startingNum - i}` : 'div',
        step: i + 1,
      });
    }

    setHeadings(updatedHeadings.reverse());
  }, [includeH6, extraSteps]);

  return (
    <section id="preview" className={preview.preview}>
      <div className={preview.preview_header}>
        <h2 className={preview.preview_title}>
          <span className="word_highlight">Preview</span>
        </h2>

        <EditPreviewText />
      </div>

      <div class={preview.preview_button_wrap}>
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

      <div className={preview.preview_content}>
        {headings.map(({ tag, step, style }) => {
          const font_size = generateClampedFontSize(
            lowerScale,
            upperScale,
            scalingType,
            step
          );

          const headingStyles = {
            ...style,
          };

          if (step > 3) {
            headingStyles.lineHeight = '1.1';
          }

          if (!usingMediaQueries) {
            headingStyles.fontSize = font_size;
          }
          return (
            <div
              key={`heading-${step}`}
              className={preview.preview_heading_wrap}
            >
              {!usingMediaQueries && (
                <FontSizeCopyLine tag={tag} step={step} font_size={font_size} />
              )}
              <Heading
                className={preview.preview_heading}
                tag={tag}
                style={headingStyles}
              >
                {headingText}
              </Heading>
            </div>
          );
        })}

        {!includeH6 && (
          <>
            {!usingMediaQueries && (
              <FontSizeCopyLine tag="h6" font_size="1rem" />
            )}
            <Heading
              className={preview.preview_heading}
              tag="h6"
              style={{ fontSize: '1rem' }}
            >
              {headingText}
            </Heading>
          </>
        )}

        <p>{paragraphText}</p>
      </div>
    </section>
  );
}
