'use client';

import layout from './styles/layout.module.css';
import Controls from './components/Controls/Controls';
import Preview from './components/Preview/Preview';
import CodeBox from './components/CodeBox/CodeBox';
import { SettingsProvider } from '@/context/SettingsContext';
import PageLoader from './components/PageLoader/PageLoader';

export default function Home() {
  return (
    <SettingsProvider>
      <main id="main" className={layout.layout}>
        <div className={layout.layout_sidebar}>
          <h1 className={layout.layout_title}>
            <span>Responsive</span>
            <span>Type</span>
            <span className={layout.layout_title_line}></span>
          </h1>
          <p className={layout.layout_disclaimer}>
            This tool is best used on a larger tablet or desktop computer.
          </p>
          <Controls />
        </div>
        <div className={layout.layout_content}>
          <Preview />
          <CodeBox />
        </div>
      </main>
      <PageLoader />
    </SettingsProvider>
  );
}
