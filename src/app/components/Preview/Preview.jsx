import 'material-symbols';
import { defaultHeadings, generateClampedFontSize } from '@/helpers/scales';
import preview from './preview.module.css';
import Heading from '../Heading';
import FontSizeCopyLine from '../FontSizeCopyLine/FontSizeCopyLine';

export default function Preview({
  lowerScale,
  upperScale,
  scalingType,
  headingText,
  paragraphText,
}) {
  return (
    <section id="preview" className={preview.preview}>
      <h2 className={preview.preview_title}>
        <span className="word_highlight">Preview</span>
      </h2>
      <div className={preview.preview_content}>
        {defaultHeadings.map(({ tag, step, style }) => {
          const font_size = generateClampedFontSize(
            lowerScale,
            upperScale,
            scalingType,
            step
          );
          return (
            <div
              key={`heading-${step}`}
              className={preview.preview_heading_wrap}
            >
              <FontSizeCopyLine tag={tag} font_size={font_size} />
              <Heading
                className={preview.preview_heading}
                tag={tag}
                style={{
                  fontSize: font_size,
                  marginBottom: '0.5rem',
                  ...style,
                }}
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
