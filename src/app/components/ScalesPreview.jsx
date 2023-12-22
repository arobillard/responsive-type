import { generateClampedFontSize } from '@/helpers/scales';
import scalesPreview from '../styles/scalesPreview.module.css';
import Heading from './Heading';

export default function ScalesPreview({
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
    <section className={scalesPreview.preview}>
      <h2>Preview</h2>
      <div className={scalesPreview.preview_content}>
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
              className={scalesPreview.preview_heading_wrap}
            >
              <div className={scalesPreview.preview_heading_code}>
                <code>{tag}</code>
                <code>font-size: {font_size};</code>
              </div>
              <Heading
                className={scalesPreview.preview_heading}
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
