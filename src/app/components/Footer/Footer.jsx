import footer from './footer.module.css';
import layout from '@/app/styles/layout.module.css';

export default function Footer() {
  return (
    <footer className={footer.footer}>
      <div className={layout.container}>
        <small>
          &copy; 2024{' '}
          <a className={footer.footer_link} href="https://adamrobillard.ca">
            Adam Robillard
          </a>
        </small>
      </div>
    </footer>
  );
}
