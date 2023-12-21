'use client';

import { useState } from 'react';
import layout from './styles/layout.module.css';
import Controls from './components/Controls';
import ScalesPreview from './components/ScalesPreview';

export default function Home() {
  const [scale, setScale] = useState(1.2);
  return (
    <main id="main" className={layout.layout}>
      <div className={layout.sidebar}>
        <h1>Responsive Type</h1>

        <p>Current Scale: {scale}</p>

        <Controls scale={scale} setScale={setScale} />
      </div>

      <ScalesPreview scale={scale} />
    </main>
  );
}
