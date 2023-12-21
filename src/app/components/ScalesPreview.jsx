import { generateFontSizeByScale } from '@/helpers/scales';
import layout from '../styles/layout.module.css';

export default function ScalesPreview({ scale }) {
  return (
    <section className={layout.preview}>
      <div className={layout.container}>
        <h2>Preview</h2>
        <h1
          style={{
            fontSize: generateFontSizeByScale(scale, 6),
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}
        >
          Heading 1
        </h1>
        <h2
          style={{
            fontSize: generateFontSizeByScale(scale, 5),
            marginBottom: '0.5rem',
            lineHeight: 1.2,
          }}
        >
          Heading 2
        </h2>
        <h3
          style={{
            fontSize: generateFontSizeByScale(scale, 4),
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          Heading 3
        </h3>
        <h4
          style={{
            fontSize: generateFontSizeByScale(scale, 3),
            marginBottom: '0.5rem',
          }}
        >
          Heading 4
        </h4>
        <h5
          style={{
            fontSize: generateFontSizeByScale(scale, 2),
            marginBottom: '0.5rem',
          }}
        >
          Heading 5
        </h5>
        <h6 style={{ fontSize: generateFontSizeByScale(scale, 1) }}>
          Heading 6
        </h6>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, omnis
          est iure necessitatibus nam esse laudantium. Tenetur laudantium enim
          tempora veritatis ratione quidem soluta! Libero sunt modi vel autem
          repellendus.
        </p>
      </div>
    </section>
  );
}
