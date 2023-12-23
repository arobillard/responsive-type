import 'material-symbols';
import { generateClampedFontSize } from '@/helpers/scales';
import preview from './preview.module.css';
import Heading from '../Heading';
import FontSizeCopyLine from '../FontSizeCopyLine/FontSizeCopyLine';

export default function Preview({
  lowerScale,
  upperScale,
  scalingType,
  sentence,
  paragraph,
}) {
  const headings = [
    {
      tag: 'h1',
      step: 6,
      style: {
        lineHeight: 1.1,
      },
    },
    {
      tag: 'h2',
      step: 5,
      style: {
        lineHeight: 1.2,
      },
    },
    {
      tag: 'h3',
      step: 4,
      style: {
        lineHeight: 1.3,
      },
    },
    {
      tag: 'h4',
      step: 3,
    },
    {
      tag: 'h5',
      step: 2,
    },
    {
      tag: 'h6',
      step: 1,
    },
  ];

  return (
    <section id="preview" className={preview.preview}>
      <h2 className={preview.preview_title}>
        <span className="word_highlight">Preview</span>
      </h2>
      <div className={preview.preview_content}>
        {headings.map(({ tag, step, style }) => {
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
                {sentence}
              </Heading>
            </div>
          );
        })}
        <p>{paragraph}</p>
      </div>
    </section>
  );
}
