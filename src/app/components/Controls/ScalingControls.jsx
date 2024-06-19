import { useState } from 'react';
import { defaultScaleOptions } from '@/helpers/scales';
import controls from './controls.module.css';

export default function ScalingControls({
  scalingType,
  setScalingType,
  lowerScale,
  setLowerScale,
  upperScale,
  setUpperScale,
}) {
  const [usingCustomLowerValue, setUsingCustomLowerValue] = useState(() => {
    // check if lowerScale value is in list of default scales
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(lowerScale);
    });

    return scaleIndex === -1;
  });
  const [usingCustomUpperValue, setUsingCustomUpperValue] = useState(() => {
    // check if upperScale value is in list of default scales
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(upperScale);
    });

    return scaleIndex === -1;
  });

  // A list of options for the lower scale value
  // that should be updated based on the upper scale value
  // to only include options smaller than upper scale
  const [lowerScaleOptions, setLowerScaleOptions] = useState(() => {
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(upperScale);
    });

    return [...defaultScaleOptions.slice(0, scaleIndex)];
  });

  // A list of options for the upper scale value
  // that should be updated based on the lower scale value
  // to only include options larger than upper scale
  const [upperScaleOptions, setUpperScaleOptions] = useState(() => {
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(lowerScale);
    });

    return [
      ...defaultScaleOptions.slice(scaleIndex + 1, defaultScaleOptions.length),
    ];
  });

  function updateLowerScale(value) {
    if (value === 'custom') {
      // Custom value logic
      setUsingCustomLowerValue(true);
      return;
    }

    setUsingCustomLowerValue(false);

    // Update state value
    setLowerScale(value);

    // update list of options if using a default scale value
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setUpperScaleOptions([
      ...defaultScaleOptions.slice(scaleIndex + 1, defaultScaleOptions.length),
    ]);
  }

  function updateUpperScale(value) {
    if (value === 'custom') {
      // Custom value logic
      setUsingCustomUpperValue(true);
      return;
    }

    setUsingCustomUpperValue(false);

    setUpperScale(value);

    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setLowerScaleOptions([...defaultScaleOptions.slice(0, scaleIndex)]);
  }

  return (
    <>
      <h3 className={controls.controls_heading}>Scaling</h3>
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
          value={usingCustomLowerValue ? 'custom' : lowerScale}
        >
          {lowerScaleOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value} – {label}
            </option>
          ))}
          <option value="custom">Custom scale</option>
        </select>
        {usingCustomLowerValue && (
          <>
            <label
              className={controls.label_subtle}
              style={{ marginBlockStart: '0.5rem' }}
              htmlFor="custom-upper-value"
            >
              Custom Lower Value
            </label>
            <input
              type="number"
              min="1"
              step="0.05"
              id="custom-upper-value"
              name="custom-upper-value"
              value={lowerScale}
              onChange={(e) => setLowerScale(e.target.value)}
            />
          </>
        )}
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="upper-scale">Upper Scale</label>
        <select
          name="upper-scale"
          id="upper-scale"
          onChange={(e) => updateUpperScale(e.target.value)}
          value={usingCustomUpperValue ? 'custom' : upperScale}
        >
          {upperScaleOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value} – {label}
            </option>
          ))}
          <option value="custom">Custom scale</option>
        </select>
        {usingCustomUpperValue && (
          <>
            <label
              className={controls.label_subtle}
              style={{ marginBlockStart: '0.5rem' }}
              htmlFor="custom-upper-value"
            >
              Custom Upper Value
            </label>
            <input
              type="number"
              min="1"
              step="0.05"
              id="custom-upper-value"
              name="custom-upper-value"
              value={upperScale}
              onChange={(e) => setUpperScale(e.target.value)}
            />
          </>
        )}
      </div>
    </>
  );
}
