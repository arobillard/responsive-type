import { useEffect, useRef, useState } from 'react';
import edit_preview_text from './editPreviewText.module.css';
import Button from '../../Button/Button';
import { useSettings } from '@/context/SettingsContext';
import ScreenReaderText from '../../accessibility/ScreenReaderText/ScreenReaderText';
import {
  default_headingText,
  default_paragraphText,
} from '@/helpers/defaultText';

export default function EditPreviewText() {
  const [settings, updateSettings] = useSettings();
  const { headingText, paragraphText } = settings;

  const dialogRef = useRef(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        setActive(false);
      }
    }

    if (active) {
      dialogRef.current.showModal();
      dialogRef.current.addEventListener('keydown', handleEscapeKey);
    } else {
      dialogRef.current.close();
      dialogRef.current.removeEventListener('keydown', handleEscapeKey);
    }
  }, [active]);

  function resetText() {
    updateSettings({
      headingText: default_headingText,
      paragraphText: default_paragraphText,
    });
    setActive(false);
  }

  return (
    <>
      <Button onClick={() => setActive(!active)} outline paddingSubtle>
        <i className="material-symbols-outlined" aria-hidden="true">
          edit
        </i>
        Edit text
      </Button>

      <dialog className={edit_preview_text.edit_preview_text} ref={dialogRef}>
        <div className={edit_preview_text.edit_preview_text_grid}>
          <h3 style={{ margin: 0 }}>Edit Preview Text</h3>
          <div>
            <label htmlFor="heading-text">Heading</label>
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
              onChange={(e) =>
                updateSettings({ paragraphText: e.target.value })
              }
            />
          </div>

          <div className={edit_preview_text.edit_preview_text_button_wrap}>
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

            <Button
              style={{ flex: '1 1' }}
              onClick={() => setActive(false)}
              color="grey"
              outline
            >
              <i className="material-symbols-outlined" aria-hidden="true">
                close
              </i>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
