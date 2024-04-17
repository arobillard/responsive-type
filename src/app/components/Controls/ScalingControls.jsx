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
  );
}
