'use client';

import { useState } from 'react';
import layout from './styles/layout.module.css';
import Controls from './components/Controls';
import ScalesPreview from './components/ScalesPreview';

export default function Home() {
  const [sentence, setSentence] = useState(
    'Life before death, strength before weakness, journey before destination.'
  );
  const [paragraph, setParagraph] = useState(
    "The Ideals of the Knights Radiant, known as the Immortal Words, serve as a guide for the Radiants' actions and lives. Each order of Radiants has five Ideals, though different Radiants from the same order may swear an ideal with slightly different words and Lightweavers swear more individualized truths instead of ideals. The wording of the First Ideal, however, is exact and is used by all orders, including the Lightweavers."
  );

  const [scale, setScale] = useState(1.2);
  const [lowerScale, setLowerScale] = useState(1.125);
  const [upperScale, setUpperScale] = useState(1.333);
  const [scalingType, setScalingType] = useState('cqi');
  return (
    <main id="main" className={layout.layout}>
      <div className={layout.sidebar}>
        <h1>Responsive Type</h1>

        <Controls
          scalingType={scalingType}
          setScalingType={setScalingType}
          lowerScale={lowerScale}
          setLowerScale={setLowerScale}
          upperScale={upperScale}
          setUpperScale={setUpperScale}
          sentence={sentence}
          setSentence={setSentence}
          paragraph={paragraph}
          setParagraph={setParagraph}
        />
      </div>

      <ScalesPreview
        scalingType={scalingType}
        lowerScale={lowerScale}
        upperScale={upperScale}
        sentence={sentence}
        paragraph={paragraph}
      />
    </main>
  );
}
