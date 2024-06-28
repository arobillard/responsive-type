import 'material-symbols';
import {
  defaultHeadings,
  generateClampedFontSize,
  generateStyles,
} from '@/helpers/scales';
import preview from './preview.module.css';
import Heading from '../Heading';
import FontSizeCopyLine from '../FontSizeCopyLine/FontSizeCopyLine';
import { useEffect, useState } from 'react';

export default function Preview({
  usingMediaQueries,
  lowerScale,
  upperScale,
  scalingType,
  mediaQueries,
  headingText,
  paragraphText,
}) {
  const [previewClasses, setPreviewClasses] = useState(preview.preview_content);
  const [styleCode, setStyleCode] = useState(``);

  useEffect(() => {
    const generatedStyles = generateStyles(
      usingMediaQueries,
      lowerScale,
      upperScale,
      scalingType,
      mediaQueries
    );

    setStyleCode(generatedStyles);
  }, [usingMediaQueries, lowerScale, upperScale, scalingType, mediaQueries]);

  useEffect(() => {
    setPreviewClasses(
      usingMediaQueries
        ? `preview_mediaQuery ${preview.preview_content}`
        : preview.preview_content
    );
  }, [usingMediaQueries]);

  return (
    <section id="preview" className={preview.preview}>
      <h2 className={preview.preview_title}>
        <span className="word_highlight">Preview</span>
      </h2>
      {usingMediaQueries && (
        <style>
          {`.preview_mediaQuery {
            ${styleCode}
          }`}
        </style>
      )}
      <div className={previewClasses}>
        {defaultHeadings.map(({ tag, step, style }) => {
          const font_size = generateClampedFontSize(
            lowerScale,
            upperScale,
            scalingType,
            step
          );

          const headingStyles = {
            marginBottom: '0.5rem',
            ...style,
          };

          if (!usingMediaQueries) {
            headingStyles.fontSize = font_size;
          }
          return (
            <div
              key={`heading-${step}`}
              className={preview.preview_heading_wrap}
            >
              {!usingMediaQueries && (
                <FontSizeCopyLine tag={tag} font_size={font_size} />
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
        <p>{paragraphText}</p>
      </div>
    </section>
  );
}
