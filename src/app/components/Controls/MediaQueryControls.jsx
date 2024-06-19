import {
  defaultMediaQueries,
  defaultScaleOptions,
  getScaleByValue,
} from '@/helpers/scales';
import controls from './controls.module.css';
import Button from '../Button/Button';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';

export default function MediaQueryControls({ mediaQueries, setMediaQueries }) {
  function addMediaQuery() {
    const newMediaQuery = {
      label: `x${mediaQueries[mediaQueries.length - 1].label}`,
      minWidth: '90em',
      scale: getScaleByValue(1.414),
    };

    // check if any default mq sizes remain
    if (mediaQueries.length < defaultMediaQueries.labels.length) {
      // if so replace mq label and values from default sizes
      newMediaQuery.label = defaultMediaQueries.labels[mediaQueries.length];
      newMediaQuery.minWidth =
        defaultMediaQueries.minWidths[mediaQueries.length];
      newMediaQuery.scale = defaultMediaQueries.scales[mediaQueries.length];
    }

    setMediaQueries([...mediaQueries, newMediaQuery]);
  }

  function updateMediaQuery(index, prop, value) {
    const updatedMediaQuery = { ...mediaQueries[index] };

    console.log(value);

    updatedMediaQuery[prop] = value;

    // get full scale object if updating scale

    if (prop === 'scale') {
      updatedMediaQuery[prop] = getScaleByValue(parseFloat(value));
      // console.log(parseFloat(value));
      // console.log(getScaleByValue(value));
    }

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
    <>
      <h3 className={controls.controls_heading}>Media Queries</h3>
      {mediaQueries.map(({ label, minWidth, scale }, i) => {
        // console.log(scale);
        return (
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
              {label} min-width
            </label>
            <input
              type="text"
              id={`min-width-${i}`}
              name={`min-width-${i}`}
              value={minWidth}
              disabled={i === 0}
              className={controls.mediaQuery_span}
              onChange={(e) => updateMediaQuery(i, 'minWidth', e.target.value)}
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
        );
      })}
      {mediaQueries.length < 8 && (
        <Button onClick={addMediaQuery} secondary hoverSuccess outline>
          <i className="material-symbols-outlined" aria-hidden="true">
            add_circle
          </i>
          <ScreenReaderText>Add media query</ScreenReaderText>
        </Button>
      )}
    </>
  );
}
