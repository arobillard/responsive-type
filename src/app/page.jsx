'use client';

import { useState } from 'react';
import layout from './styles/layout.module.css';
import sidebar from './styles/sidebar.module.css';
import Controls from './components/Controls/Controls';
import Preview from './components/Preview/Preview';

export default function Home() {
  const [sentence, setSentence] = useState(
    'Life before death, strength before weakness, journey before destination.'
  );
  const [paragraph, setParagraph] = useState(
    "The Ideals of the Knights Radiant, known as the Immortal Words, serve as a guide for the Radiants' actions and lives. Each order of Radiants has five Ideals, though different Radiants from the same order may swear an ideal with slightly different words and Lightweavers swear more individualized truths instead of ideals. The wording of the First Ideal, however, is exact and is used by all orders, including the Lightweavers."
  );

  const [lowerScale, setLowerScale] = useState(1.125);
  const [upperScale, setUpperScale] = useState(1.333);
  const [scalingType, setScalingType] = useState('cqi');
  return (
    <main id="main" className={layout.layout}>
      <div className={sidebar.sidebar}>
        <h1 className={sidebar.sidebar_title}>
          <span className="word_highlight">Responsive</span>{' '}
          <span className="word_highlight">Type</span>
        </h1>

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

      <Preview
        scalingType={scalingType}
        lowerScale={lowerScale}
        upperScale={upperScale}
        sentence={sentence}
        paragraph={paragraph}
      />
    </main>
  );
}
