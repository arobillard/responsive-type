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
    // Set scale label
    let newLabel = 'nl';

    // check if last media query label is in list of default labels
    const labelIndex = defaultMediaQueries.labels.findIndex(
      (label) => label === mediaQueries[mediaQueries.length - 1].label
    );

    if (labelIndex !== -1) {
      // if in list and another label exists after in list assign the label
      const nextLabel = defaultMediaQueries.labels[labelIndex + 1];

      if (nextLabel) {
        newLabel = nextLabel;
      } else {
        // if in list but no following label exists, add 'x' to start of existing label
        newLabel = `x${defaultMediaQueries.labels[labelIndex]}`;
      }
    } else {
      // if not in list, assign label as an empty string
      newLabel = ``;
    }

    // Set minWidth
    let newMinWidth = null;
    const prevMinWidth = mediaQueries[mediaQueries.length - 1].minWidth;

    // check if last media query minWidth is in list of default minWidths
    const minWidthIndex = defaultMediaQueries.minWidths.findIndex(
      (minWidth) => minWidth === prevMinWidth
    );

    if (minWidthIndex !== -1) {
      // if in list and another minWidth exists after in list assign the minWidth
      const nextMinWidth = defaultMediaQueries.minWidths[minWidthIndex + 1];

      if (nextMinWidth) {
        newMinWidth = nextMinWidth;
      }
    }

    // if not in list or in list but no following label exists,
    // add 20em to minWidth value of last item
    if (!newMinWidth) {
      // check for units used
      const units = ['rem', 'em', 'px'];

      // store unit used
      const unit = units.find((u) => {
        return prevMinWidth.includes(u);
      });

      if (unit) {
        // strip out units
        const prev_minWidth_as_string = prevMinWidth.replace(unit, '');
        // convert to number
        const prev_minWidth_as_number = parseFloat(prev_minWidth_as_string);

        if (isNaN(prev_minWidth_as_number)) {
          // if unable to convert to number, insert placeholder value
          // match unit if possible
          if (unit === 'px') {
            newMinWidth = '1440px';
          } else {
            newMinWidth = `90${unit}`;
          }
        } else {
          // if unit is `px` add 320 to value
          if (unit === 'px') {
            newMinWidth = `${prev_minWidth_as_number + 320}${unit}`;
          } else {
            // if unit is `em` or `rem` add 20 to value
            newMinWidth = `${prev_minWidth_as_number + 20}${unit}`;
          }
        }
      } else {
        newMinWidth = '90em';
      }
    }

    // Set scale value

    // Set placeholder custom scale option
    let newScale = {
      value: 1.1,
      label: 'Custom',
    };

    const prevScaleValue = mediaQueries[mediaQueries.length - 1].scale.value;

    // check if last media query is using a default scale
    const scaleIndex = defaultScaleOptions.findIndex(
      (scale) => scale.value === prevScaleValue
    );

    // check if value is in default list and not last item
    if (scaleIndex !== -1 && scaleIndex !== defaultScaleOptions.length - 1) {
      newScale = defaultScaleOptions[scaleIndex + 1];
    } else {
      // if previous scale has a value, add 0.125
      if (typeof prevScaleValue === 'number') {
        newScale.value = prevScaleValue + 0.125;
      }
    }

    setMediaQueries([
      ...mediaQueries,
      {
        label: newLabel,
        minWidth: newMinWidth,
        scale: newScale,
        id: mediaQueries.length,
      },
    ]);
  }

  function updateMediaQuery(index, prop, value) {
    // copy existing mediaQueries
    const updatedMediaQueries = [...mediaQueries];

    if (prop === 'scale') {
      // if value is 'custom' only update the label
      if (value === 'custom') {
        updatedMediaQueries[index].scale.label = 'Custom';
      } else {
        // check if value is in list of default scales
        const newScale = getScaleByValue(parseFloat(value));

        if (newScale) {
          updatedMediaQueries[index].scale = newScale;
        }
      }
    } else if (prop === 'custom-scale') {
      updatedMediaQueries[index].scale.value = parseFloat(value);
    } else {
      updatedMediaQueries[index][prop] = value;
    }

    // update mediaQueries state
    setMediaQueries(updatedMediaQueries);
  }

  function removeMediaQuery(index) {
    setMediaQueries([
      ...mediaQueries.slice(0, index),
      ...mediaQueries.slice(index + 1),
    ]);
  }

  return (
    <>
      <h3 className={controls.controls_subHeading}>Media Queries</h3>
      {mediaQueries.map(({ label, minWidth, scale, id }, i) => {
        // console.log(scale);
        return (
          <div className={controls.mediaQuery_item} key={`mq-${id}`}>
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
              className={i === 0 ? controls.mediaQuery_span : ''}
              disabled={i === 0}
              onChange={(e) => updateMediaQuery(i, 'minWidth', e.target.value)}
            />

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

            <label htmlFor={`scale-${i}`} className="srt">
              {label} Scale
            </label>
            <select
              name={`scale-${i}`}
              id={`scale-${i}`}
              value={scale.label === 'Custom' ? 'custom' : scale.value}
              onChange={(e) => updateMediaQuery(i, 'scale', e.target.value)}
              className={controls.mediaQuery_fullSpan}
            >
              {defaultScaleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {value} – {label}
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
            {scale.label === 'Custom' && (
              <>
                <label htmlFor={`custom-scale-${i}`} className="srt">
                  {label} custom scale
                </label>
                <input
                  type="number"
                  id={`custom-scale-${i}`}
                  name={`custom-scale-${i}`}
                  value={scale.value}
                  className={controls.mediaQuery_fullSpan}
                  onChange={(e) =>
                    updateMediaQuery(i, 'custom-scale', e.target.value)
                  }
                />
              </>
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
