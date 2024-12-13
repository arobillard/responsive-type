import layout from './styles/layout.module.css';
import not_found from './styles/notFound.module.css';
import { apply_classes } from '@/helpers/styling';
import Btn from './components/Button/Btn';

export default function NotFound() {
  return (
    <main>
      <header class={not_found.not_found}>
        <div
          className={apply_classes([layout.container, layout.container_narrow])}
        >
          <h1>Sorry, nothing here.</h1>
          <Btn href="/">Return to app</Btn>
        </div>
      </header>
    </main>
  );
}
