import 'material-symbols';
import controls from './controls.module.css';
import Switch from '../inputs/Switch/Switch';
import MediaQueryControls from './MediaQueryControls';
import ScalingControls from './ScalingControls';
import { useSettings } from '@/context/SettingsContext';

export default function Controls() {
  const [settings, updateSettings] = useSettings();

  const { usingMediaQueries, includeH6, asVariables } = settings;

  return (
    <section id="controls" className={controls.controls}>
      <h2 className={controls.controls_heading}>Controls</h2>

      <Switch
        name="usingMediaQueries"
        label="Use @media"
        onChange={() =>
          updateSettings({ usingMediaQueries: !usingMediaQueries })
        }
        checked={usingMediaQueries || false}
      />

      <Switch
        name="includeH6"
        label="Include h6 in scales"
        onChange={() => updateSettings({ includeH6: !includeH6 })}
        checked={includeH6 || false}
      />

      <Switch
        name="asVariables"
        label="Use CSS Variables"
        onChange={() => updateSettings({ asVariables: !asVariables })}
        checked={asVariables || false}
      />

      {usingMediaQueries ? <MediaQueryControls /> : <ScalingControls />}
    </section>
  );
}
