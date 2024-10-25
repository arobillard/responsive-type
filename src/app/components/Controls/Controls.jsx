import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import MediaQueryControls from './MediaQueryControls';
import ScalingControls from './ScalingControls';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

      <Switch
        name="usingMediaQueries"
        label="Use @media"
        onChange={() => setUsingMediaQueries(!usingMediaQueries)}
        checked={usingMediaQueries}
      />

      {usingMediaQueries && isClient ? (
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

      <h3 className={controls.controls_subHeading}>Content</h3>
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
