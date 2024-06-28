'use client';

import { useEffect, useState } from 'react';
import layout from './styles/layout.module.css';
import Controls from './components/Controls/Controls';
import Preview from './components/Preview/Preview';
import { getInitialMediaQueries } from '@/helpers/scales';
import CodeBox from './components/CodeBox/CodeBox';
import Button from './components/Button/Button';

const default_headingText =
  'Life before death, strength before weakness, journey before destination.';
const default_paragraphText =
  "The Ideals of the Knights Radiant, known as the Immortal Words, serve as a guide for the Radiants' actions and lives. Each order of Radiants has five Ideals, though different Radiants from the same order may swear an ideal with slightly different words and Lightweavers swear more individualized truths instead of ideals. The wording of the First Ideal, however, is exact and is used by all orders, including the Lightweavers.";

export default function Home() {
  const [usingMediaQueries, setUsingMediaQueries] = useState(false);
  const [scalingType, setScalingType] = useState('cqi');
  const [lowerScale, setLowerScale] = useState(1.125);
  const [upperScale, setUpperScale] = useState(1.333);
  const [mediaQueries, setMediaQueries] = useState(getInitialMediaQueries());
  const [headingText, setHeadingText] = useState(default_headingText);
  const [paragraphText, setParagraphText] = useState(default_paragraphText);

  // Create functions that will both update the state value and store the value in localStorage
  function updateUsingMediaQueries(value) {
    setUsingMediaQueries(value);
    localStorage.setItem('rt-usingMediaQueries', value);
  }
  function updateScalingType(value) {
    setScalingType(value);
    localStorage.setItem('rt-scalingType', value);
  }
  function updateLowerScale(value) {
    setLowerScale(value);
    localStorage.setItem('rt-lowerScale', value);
  }
  function updateUpperScale(value) {
    setUpperScale(value);
    localStorage.setItem('rt-upperScale', value);
  }
  function updateMediaQueries(value) {
    setMediaQueries(value);
    localStorage.setItem('rt-mediaQueries', JSON.stringify(value));
  }
  function updateHeadingText(value) {
    setHeadingText(value);
    localStorage.setItem('rt-headingText', value);
  }
  function updateParagraphText(value) {
    setParagraphText(value);
    localStorage.setItem('rt-paragraphText', value);
  }

  // Get stored values from localStorage and update State
  useEffect(() => {
    setUsingMediaQueries(
      localStorage.getItem('rt-usingMediaQueries') === 'true'
    );
    setScalingType(localStorage.getItem('rt-scalingType') || 'cqi');
    setLowerScale(localStorage.getItem('rt-lowerScale') || 1.125);
    setUpperScale(localStorage.getItem('rt-upperScale') || 1.333);
    setMediaQueries(
      JSON.parse(localStorage.getItem('rt-mediaQueries')) ||
        getInitialMediaQueries()
    );
    setHeadingText(
      localStorage.getItem('rt-headingText') || default_headingText
    );
    setParagraphText(
      localStorage.getItem('rt-paragraphText') || default_paragraphText
    );
  }, []);

  function resetText() {
    updateHeadingText(default_headingText);
    updateParagraphText(default_paragraphText);
  }

  function resetScaleValues() {
    updateLowerScale(1.125);
    updateUpperScale(1.333);
    updateMediaQueries(getInitialMediaQueries());
  }

  return (
    <main id="main" className={layout.layout}>
      <div className={layout.layout_sidebar}>
        <h1>
          <span className="word_highlight">Responsive</span>{' '}
          <span className="word_highlight">Type</span>
        </h1>

        <Controls
          usingMediaQueries={usingMediaQueries}
          updateUsingMediaQueries={updateUsingMediaQueries}
          scalingType={scalingType}
          updateScalingType={updateScalingType}
          lowerScale={lowerScale}
          updateLowerScale={updateLowerScale}
          upperScale={upperScale}
          updateUpperScale={updateUpperScale}
          headingText={headingText}
          updateHeadingText={updateHeadingText}
          mediaQueries={mediaQueries}
          updateMediaQueries={updateMediaQueries}
          paragraphText={paragraphText}
          updateParagraphText={updateParagraphText}
          resetText={resetText}
        />
      </div>

      <div className={layout.layout_content}>
        <Preview
          usingMediaQueries={usingMediaQueries}
          scalingType={scalingType}
          lowerScale={lowerScale}
          upperScale={upperScale}
          mediaQueries={mediaQueries}
          headingText={headingText}
          paragraphText={paragraphText}
        />
        <CodeBox
          usingMediaQueries={usingMediaQueries}
          scalingType={scalingType}
          lowerScale={lowerScale}
          upperScale={upperScale}
          mediaQueries={mediaQueries}
        />
      </div>

      <Button
        onClick={resetScaleValues}
        style={{ position: 'fixed', inset: 'auto 1rem 1rem auto' }}
      >
        Reset
      </Button>
    </main>
  );
}
