import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import MediaQueryControls from './MediaQueryControls';
import ScalingControls from './ScalingControls';
import Button from '../Button/Button';
import { useSettings } from '@/context/SettingsContext';
import {
  default_headingText,
  default_paragraphText,
} from '@/helpers/defaultText';

export default function Controls() {
  const [settings, updateSettings] = useSettings();

  const { usingMediaQueries, headingText, paragraphText } = settings;

  function resetText() {
    updateSettings({
      headingText: default_headingText,
      paragraphText: default_paragraphText,
    });
  }

  return (
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

      <Switch
        name="usingMediaQueries"
        label="Use @media"
        onChange={() =>
          updateSettings({ usingMediaQueries: !usingMediaQueries })
        }
        checked={usingMediaQueries}
      />

      {usingMediaQueries ? <MediaQueryControls /> : <ScalingControls />}

      <h3 className={controls.controls_subHeading}>Content</h3>
      <div className={controls.grid_unit}>
        <label htmlFor="heading-text">Heading</label>
        <input
          type="text"
          id="heading-text"
          name="heading-text"
          value={headingText}
          onChange={(e) => updateSettings({ headingText: e.target.value })}
        />
      </div>
      <div className={controls.grid_unit}>
        <label htmlFor="paragraph-text">Paragraph</label>
        <textarea
          id="paragraph-text"
          name="paragraph-text"
          value={paragraphText}
          onChange={(e) => updateSettings({ paragraphText: e.target.value })}
        />
      </div>
      <Button onClick={resetText} secondary outline>
        <i className="material-symbols-outlined" aria-hidden="true">
          undo
        </i>
        Reset Text
      </Button>
    </section>
  );
}
