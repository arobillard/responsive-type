'use client';

import { useState } from 'react';
import layout from './styles/layout.module.css';
import Controls from './components/Controls';
import ScalesPreview from './components/ScalesPreview';

export default function Home() {
  const [scale, setScale] = useState(1.2);
  const [lowerScale, setLowerScale] = useState(1.125);
  const [upperScale, setUpperScale] = useState(1.333);
  return (
    <main id="main" className={layout.layout}>
      <div className={layout.sidebar}>
        <h1>Responsive Type</h1>

        <p>Current Scale: {scale}</p>
        <p>Lower Scale: {lowerScale}</p>
        <p>Upper Scale: {upperScale}</p>

        <Controls
          scale={scale}
          setScale={setScale}
          lowerScale={lowerScale}
          setLowerScale={setLowerScale}
          upperScale={upperScale}
          setUpperScale={setUpperScale}
        />
      </div>

      <ScalesPreview
        scale={scale}
        lowerScale={lowerScale}
        upperScale={upperScale}
      />
    </main>
  );
}
