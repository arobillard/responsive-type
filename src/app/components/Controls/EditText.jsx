import { useSettings } from '@/context/SettingsContext';
import CollapseBox from '../CollapseBox/CollapseBox';
import Grid from '../Grid/Grid';
import {
  default_headingText,
  default_paragraphText,
} from '@/helpers/defaultText';
import Button from '../Button/Button';

export default function EditText() {
  const [settings, updateSettings] = useSettings();
  const { headingText, paragraphText } = settings;

  function resetText() {
    updateSettings({
      headingText: default_headingText,
      paragraphText: default_paragraphText,
    });
  }

  return (
    <CollapseBox heading={{ text: 'Preview Text', icon: 'text_fields' }}>
      <Grid gap="var(--spacer-m)" padding="var(--spacer-m)">
        <div>
          <label htmlFor="heading-text">Headings</label>
          <input
            type="text"
            id="heading-text"
            name="heading-text"
            value={headingText}
            onChange={(e) => updateSettings({ headingText: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="paragraph-text">Paragraph</label>
          <textarea
            id="paragraph-text"
            name="paragraph-text"
            value={paragraphText}
            onChange={(e) => updateSettings({ paragraphText: e.target.value })}
          />
        </div>
        {(headingText !== default_headingText ||
          paragraphText !== default_paragraphText) && (
          <Button
            style={{ flex: '1 1' }}
            onClick={resetText}
            color="danger"
            outline
          >
            <i className="material-symbols-outlined" aria-hidden="true">
              undo
            </i>
            Reset Text
          </Button>
        )}
      </Grid>
    </CollapseBox>
  );
}
