import layout from './styles/layout.module.css';
import not_found from './styles/notFound.module.css';
import { apply_classes } from '@/helpers/styling';
import Button from './components/Button/Button';

export default function NotFound() {
  return (
    <main>
      <header class={not_found.not_found}>
        <div
          className={apply_classes([layout.container, layout.container_narrow])}
        >
          <h1>Sorry, nothing here.</h1>
          <Button href="/" color="danger" outline>
            Return to app
          </Button>
        </div>
      </header>
    </main>
  );
}
