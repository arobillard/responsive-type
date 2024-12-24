import { useSettings } from '@/context/SettingsContext';
import page_loader from './pageLoader.module.css';
import ScreenReaderText from '../accessibility/ScreenReaderText/ScreenReaderText';

export default function PageLoader() {
  const [settings] = useSettings();

  const { loaded } = settings;

  if (loaded) return null;

  return (
    <div className={page_loader.page_loader}>
      <ScreenReaderText>Loading</ScreenReaderText>
      <div className={page_loader.page_loader_loader}>
        <span className={page_loader.page_loader_item}></span>
        <span className={page_loader.page_loader_item}></span>
        <span className={page_loader.page_loader_item}></span>
      </div>
    </div>
  );
}
