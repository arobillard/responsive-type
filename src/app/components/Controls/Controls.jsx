import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import MediaQueryControls from './MediaQueryControls';
import ScalingControls from './ScalingControls';
import Button from '../Button/Button';

export default function Controls({
  usingMediaQueries,
  setUsingMediaQueries,
  scalingType,
  setScalingType,
  lowerScale,
  setLowerScale,
  upperScale,
  setUpperScale,
  headingText,
  setHeadingText,
  mediaQueries,
  setMediaQueries,
  paragraphText,
  setParagraphText,
  resetText,
}) {
  return (
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

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

      <Switch
        name="usingMediaQueries"
        label="Use @media"
        onChange={() => setUsingMediaQueries(!usingMediaQueries)}
        checked={usingMediaQueries}
      />

      <h3 className={controls.controls_heading}>Content</h3>
      <div className={controls.grid_unit}>
        <label htmlFor="heading-text">Heading</label>
        <input
          type="text"
          id="heading-text"
          name="heading-text"
          value={headingText}
          onChange={(e) => setHeadingText(e.target.value)}
        />
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="paragraph-text">Paragraph</label>
        <textarea
          id="paragraph-text"
          name="paragraph-text"
          value={paragraphText}
          onChange={(e) => setParagraphText(e.target.value)}
        />
      </div>
      <Button onClick={resetText} secondary outline>
        Reset Text
      </Button>
    </section>
  );
}
