import { useState } from 'react';
import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';
import Button from '../Button/Button';
import { defaultMediaQueries, defaultScaleOptions } from '@/helpers/scales';
import MediaQueryControls from './MediaQueryControls';
import ScalingControls from './ScalingControls';

export default function Controls({
  usingMediaQueries,
  setUsingMediaQueries,
  scalingType,
  setScalingType,
  lowerScale,
  setLowerScale,
  upperScale,
  setUpperScale,
  sentence,
  setSentence,
  mediaQueries,
  setMediaQueries,
  paragraph,
  setParagraph,
}) {
  function addMediaQuery() {
    const largestMediaQuery = mediaQueries[mediaQueries.length - 1];

    const newMediaQuery = {
      label:
        defaultMediaQueries.labels[
          defaultMediaQueries.labels.indexOf(largestMediaQuery.label) + 1
        ],
      minWidth:
        defaultMediaQueries.minWidths[
          defaultMediaQueries.minWidths.indexOf(largestMediaQuery.minWidth) + 1
        ],
      scale:
        defaultMediaQueries.scales[
          defaultMediaQueries.scales.indexOf(largestMediaQuery.scale) + 1
        ],
    };

    setMediaQueries([...mediaQueries, newMediaQuery]);
  }

  function updateMediaQuery(index, prop, value) {
    console.log(index, prop, value);

    const updatedMediaQuery = { ...mediaQueries[index] };

    updatedMediaQuery[prop] = value;

    setMediaQueries([
      ...mediaQueries.slice(0, index),
      updatedMediaQuery,
      ...mediaQueries.slice(index + 1),
    ]);
  }

  function removeMediaQuery(index) {
    setMediaQueries([
      ...mediaQueries.slice(0, index),
      ...mediaQueries.slice(index + 1),
    ]);
  }

  return (
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

      <Switch
        name="usingMediaQueries"
        label="Use @media"
        onChange={() => setUsingMediaQueries(!usingMediaQueries)}
        checked={usingMediaQueries}
      />

      {usingMediaQueries ? (
        <MediaQueryControls
          mediaQueries={mediaQueries}
          setMediaQueries={setMediaQueries}
        />
      ) : (
        <ScalingControls
          scalingType={scalingType}
          setScalingType={setScalingType}
          lowerScale={lowerScale}
          setLowerScale={setLowerScale}
          upperScale={upperScale}
          setUpperScale={setUpperScale}
        />
      )}

      <h3 className={controls.controls_heading}>Content</h3>
      <div className={controls.grid_unit}>
        <label htmlFor="sentence">Heading</label>
        <input
          type="text"
          id="sentence"
          name="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="paragraph">Paragraph</label>
        <textarea
          id="paragraph"
          name="paragraph"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        />
      </div>
    </section>
  );
}
