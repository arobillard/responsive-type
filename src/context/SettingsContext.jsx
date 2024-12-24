import {
  default_headingText,
  default_paragraphText,
} from '@/helpers/defaultText';
import { getInitialMediaQueries } from '@/helpers/scales';
import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider(props) {
  const [settings, setSettings] = useState({
    loaded: false,
    usingMediaQueries: false,
    scalingType: 'cqi',
    lowerScale: null,
    upperScale: null,
    mediaQueries: getInitialMediaQueries(),
    extraSteps: 0,
    includeH6: true,
    asVariables: true,
    headingText: default_headingText,
    paragraphText: default_paragraphText,
    previewOpen: true,
    codeBoxOpen: false,
  });

  function updateSettings(updatedSettings) {
    const settingsClone = { ...settings };

    for (const key of Object.keys(updatedSettings)) {
      settingsClone[key] = updatedSettings[key];
      if (key === 'mediaQueries') {
        localStorage.setItem(`rt-${key}`, JSON.stringify(updatedSettings[key]));
      } else {
        localStorage.setItem(`rt-${key}`, updatedSettings[key]);
      }
    }

    setSettings(settingsClone);
  }

  useEffect(() => {
    setSettings({
      loaded: true,
      usingMediaQueries:
        localStorage.getItem('rt-usingMediaQueries') === 'true',
      scalingType: localStorage.getItem('rt-scalingType') || 'cqi',
      lowerScale: localStorage.getItem('rt-lowerScale') || 1.125,
      upperScale: localStorage.getItem('rt-upperScale') || 1.333,
      mediaQueries:
        JSON.parse(localStorage.getItem('rt-mediaQueries')) ||
        getInitialMediaQueries(),
      extraSteps: parseInt(localStorage.getItem('rt-extraSteps')) || 0,
      includeH6: localStorage.getItem('rt-includeH6')
        ? localStorage.getItem('rt-includeH6') === 'true'
        : true,
      asVariables: localStorage.getItem('rt-asVariables')
        ? localStorage.getItem('rt-asVariables') === 'true'
        : true,
      headingText:
        localStorage.getItem('rt-headingText') || default_headingText,
      paragraphText:
        localStorage.getItem('rt-paragraphText') || default_paragraphText,
      previewOpen: localStorage.getItem('rt-previewOpen') === 'true',
      codeBoxOpen: localStorage.getItem('rt-codeBoxOpen') === 'true',
    });
  }, []);

  return (
    <SettingsContext.Provider value={[settings, updateSettings]} {...props} />
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('Not inside of the Settings Provider');
  return context;
}

export { useSettings, SettingsProvider };
