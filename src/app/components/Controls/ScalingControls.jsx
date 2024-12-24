import { useEffect, useState } from 'react';
import { defaultScaleOptions } from '@/helpers/scales';
import controls from './controls.module.css';
import Button from '../Button/Button';
import { useSettings } from '@/context/SettingsContext';
import CollapseBox from '../CollapseBox/CollapseBox';
import Grid from '../Grid/Grid';

export default function ScalingControls() {
  const [settings, updateSettings] = useSettings();

  const { scalingType, upperScale, lowerScale, scalingOpen } = settings;

  const [usingCustomLowerValue, setUsingCustomLowerValue] = useState(false);
  const [usingCustomUpperValue, setUsingCustomUpperValue] = useState(false);

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

  useEffect(() => {
    // check if lowerScale value is in list of default scales
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(lowerScale);
    });

    setUsingCustomLowerValue(scaleIndex === -1);
  }, [lowerScale]);

  useEffect(() => {
    // check if upperScale value is in list of default scales
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(upperScale);
    });

    setUsingCustomUpperValue(scaleIndex === -1);
  }, [upperScale]);

  function changeLowerScale(value) {
    if (value === 'custom') {
      // Custom value logic
      setUsingCustomLowerValue(true);
      return;
    }

    updateSettings({ lowerScale: value });

    // update list of options if using a default scale value
    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setUpperScaleOptions([
      ...defaultScaleOptions.slice(scaleIndex + 1, defaultScaleOptions.length),
    ]);
  }

  function changeUpperScale(value) {
    console.log('change upper scale');
    if (value === 'custom') {
      // Custom value logic
      setUsingCustomUpperValue(true);
      return;
    }

    updateSettings({ upperScale: value });

    const scaleIndex = defaultScaleOptions.findIndex((option) => {
      return option.value === parseFloat(value);
    });

    setLowerScaleOptions([...defaultScaleOptions.slice(0, scaleIndex)]);
  }

  function resetScales() {
    updateSettings({
      lowerScale: 1.125,
      upperScale: 1.333,
    });
  }

  if (lowerScale === null || upperScale === null) {
    return <p>Loading...</p>;
  }

  function setCollapseStatus(status) {
    updateSettings({ scalingOpen: status });
  }

  return (
    <CollapseBox
      heading={{ text: 'Scaling', icon: 'signal_cellular_alt' }}
      callBack={setCollapseStatus}
      defaultExpanded={scalingOpen}
    >
      <Grid gap="var(--spacer-m)" padding="var(--spacer-m)">
        <div className={controls.grid_unit}>
          <label htmlFor="scaling-type">Scaling Type</label>
          <select
            name="scaling-type"
            id="scaling-type"
            onChange={(e) => updateSettings({ scalingType: e.target.value })}
            value={scalingType}
          >
            <option value="cqi">cqi</option>
            <option value="vi">vi</option>
          </select>
        </div>
        <div className={controls.grid_unit}>
          <label htmlFor="lower-scale">Lower Scale</label>
          <select
            name="lower-scale"
            id="lower-scale"
            onChange={(e) => changeLowerScale(e.target.value)}
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
                onChange={(e) => changeLowerScale(e.target.value)}
              />
            </>
          )}
        </div>
        <div className={controls.grid_unit}>
          <label htmlFor="upper-scale">Upper Scale</label>
          <select
            name="upper-scale"
            id="upper-scale"
            onChange={(e) => changeUpperScale(e.target.value)}
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
                onChange={(e) => changeUpperScale(e.target.value)}
              />
            </>
          )}
        </div>

        {(parseFloat(lowerScale) !== 1.125 ||
          parseFloat(upperScale) !== 1.333) && (
          <Button onClick={resetScales} color="danger" outline>
            <i className="material-symbols-outlined" aria-hidden="true">
              undo
            </i>
            Reset Scales
          </Button>
        )}
      </Grid>
    </CollapseBox>
  );
}
