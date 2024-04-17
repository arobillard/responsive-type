import { useState } from 'react';
import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';
import Button from '../Button/Button';
import { defaultMediaQueries, defaultScaleOptions } from '@/helpers/scales';

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
  const [lowerScaleOptions, setLowerScaleOptions] = useState([
    ...defaultScaleOptions.slice(0, 3),
  ]);
  const [upperScaleOptions, setUpperScaleOptions] = useState([
    ...defaultScaleOptions.slice(4, defaultScaleOptions.length),
  ]);

  function updateLowerScale(value) {
    setLowerScale(value);

    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setUpperScaleOptions([
      ...defaultScaleOptions.slice(scaleIndex + 1, defaultScaleOptions.length),
    ]);
  }

  function updateUpperScale(value) {
    setUpperScale(value);

    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setLowerScaleOptions([...defaultScaleOptions.slice(0, scaleIndex)]);
  }

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
        <>
          <h3 className={controls.controls_heading}>Media Queries</h3>
          {mediaQueries.map(({ label, minWidth, scale }, i) => (
            <div className={controls.mediaQuery_item} key={`${label}-${scale}`}>
              <label htmlFor={`label-${i}`} className="srt">
                MQ Label
              </label>
              <input
                type="text"
                id={`label-${i}`}
                name={`label-${i}`}
                value={label}
                onChange={(e) => updateMediaQuery(i, 'label', e.target.value)}
              />

              <label htmlFor={`min-width-${i}`} className="srt">
                min-width
              </label>
              <input
                type="text"
                id={`min-width-${i}`}
                name={`min-width-${i}`}
                value={minWidth}
                disabled={i === 0}
                className={controls.mediaQuery_span}
                onChange={(e) =>
                  updateMediaQuery(i, 'minWidth', e.target.value)
                }
              />

              <label htmlFor={`scale-${i}`} className="srt">
                {label} Scale
              </label>
              <select
                name={`scale-${i}`}
                id={`scale-${i}`}
                value={scale.value}
                onChange={(e) => updateMediaQuery(i, 'scale', e.target.value)}
                className={
                  i === 0
                    ? controls.mediaQuery_fullSpan
                    : controls.mediaQuery_span
                }
              >
                {defaultScaleOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {value} – {label}
                  </option>
                ))}
              </select>
              {i !== 0 && (
                <Button
                  onClick={() => removeMediaQuery(i)}
                  secondary
                  outline
                  paddingSubtle
                >
                  <i className="material-symbols-outlined" aria-hidden="true">
                    delete
                  </i>
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addMediaQuery} secondary outline>
            <i className="material-symbols-outlined" aria-hidden="true">
              add_circle
            </i>
            <ScreenReaderText>Add media query</ScreenReaderText>
          </Button>
        </>
      ) : (
        <>
          <div className={controls.grid_unit}>
            <label htmlFor="scaling-type">Scaling Type</label>
            <select
              name="scaling-type"
              id="scaling-type"
              onChange={(e) => setScalingType(e.target.value)}
              value={scalingType}
            >
              <option value="cqi">cqi</option>
              <option value="vw">vw</option>
            </select>
          </div>
          <div className={controls.grid_unit}>
            <label htmlFor="lower-scale">Lower Scale</label>
            <select
              name="lower-scale"
              id="lower-scale"
              onChange={(e) => updateLowerScale(e.target.value)}
              value={lowerScale}
            >
              {lowerScaleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {value} – {label}
                </option>
              ))}
            </select>
          </div>
          <div className={controls.grid_unit}>
            <label htmlFor="upper-scale">Upper Scale</label>
            <select
              name="upper-scale"
              id="upper-scale"
              onChange={(e) => updateUpperScale(e.target.value)}
              value={upperScale}
            >
              {upperScaleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {value} – {label}
                </option>
              ))}
            </select>
          </div>
        </>
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
