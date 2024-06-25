'use client';

import { useEffect, useState } from 'react';
import layout from './styles/layout.module.css';
import sidebar from './styles/sidebar.module.css';
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
  const [usingMediaQueries, setUsingMediaQueries] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-usingMediaQueries') === 'true';
    }
    return false;
  });

  const [scalingType, setScalingType] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-scalingType') || 'cqi';
    }
    return 'cqi';
  });
  const [lowerScale, setLowerScale] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-lowerScale') || 1.125;
    }
    return 1.125;
  });
  const [upperScale, setUpperScale] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-upperScale') || 1.333;
    }
    return 1.333;
  });

  const [mediaQueries, setMediaQueries] = useState(() => {
    if (window) {
      return (
        JSON.parse(localStorage.getItem('rt-mediaQueries')) ||
        getInitialMediaQueries()
      );
    }
    return getInitialMediaQueries();
  });

  const [headingText, setHeadingText] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-headingText') || default_headingText;
    }
    return default_headingText;
  });
  const [paragraphText, setParagraphText] = useState(() => {
    if (window) {
      return localStorage.getItem('rt-paragraphText') || default_paragraphText;
    }
    return default_paragraphText;
  });

  useEffect(() => {
    localStorage.setItem('rt-usingMediaQueries', usingMediaQueries);
  }, [usingMediaQueries]);

  useEffect(() => {
    localStorage.setItem('rt-scalingType', scalingType);
  }, [scalingType]);

  useEffect(() => {
    localStorage.setItem('rt-lowerScale', lowerScale);
  }, [lowerScale]);

  useEffect(() => {
    localStorage.setItem('rt-upperScale', upperScale);
  }, [upperScale]);

  useEffect(() => {
    localStorage.setItem('rt-mediaQueries', JSON.stringify(mediaQueries));
  }, [mediaQueries]);

  useEffect(() => {
    localStorage.setItem('rt-headingText', headingText);
    localStorage.setItem('rt-paragraphText', paragraphText);
  }, [headingText, paragraphText]);

  function resetText() {
    setHeadingText(default_headingText);
    setParagraphText(default_paragraphText);
  }

  function resetScaleValues() {
    setLowerScale(1.125);
    setUpperScale(1.333);
    setMediaQueries(getInitialMediaQueries());
  }

  return (
    <main id="main" className={layout.layout}>
      <div className={sidebar.sidebar}>
        <h1 className={sidebar.sidebar_title}>
          <span className="word_highlight">Responsive</span>{' '}
          <span className="word_highlight">Type</span>
        </h1>

        <Controls
          usingMediaQueries={usingMediaQueries}
          setUsingMediaQueries={setUsingMediaQueries}
          scalingType={scalingType}
          setScalingType={setScalingType}
          lowerScale={lowerScale}
          setLowerScale={setLowerScale}
          upperScale={upperScale}
          setUpperScale={setUpperScale}
          headingText={headingText}
          setHeadingText={setHeadingText}
          mediaQueries={mediaQueries}
          setMediaQueries={setMediaQueries}
          paragraphText={paragraphText}
          setParagraphText={setParagraphText}
          resetText={resetText}
        />
      </div>

      <Preview
        usingMediaQueries={usingMediaQueries}
        scalingType={scalingType}
        lowerScale={lowerScale}
        upperScale={upperScale}
        headingText={headingText}
        paragraphText={paragraphText}
      />

      <CodeBox
        usingMediaQueries={usingMediaQueries}
        scalingType={scalingType}
        lowerScale={lowerScale}
        upperScale={upperScale}
      />

      <Button
        onClick={resetScaleValues}
        style={{ position: 'fixed', inset: 'auto 1rem 1rem auto' }}
      >
        Reset
      </Button>
    </main>
  );
}
