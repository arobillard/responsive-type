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
          <h1 className={layout.layout_title}>Responsive Type</h1>
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
