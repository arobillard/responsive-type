import footer from './footer.module.css';
import layout from '@/app/styles/layout.module.css';

export default function Footer() {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <footer className={footer.footer}>
      <div className={layout.container}>
        <small>
          &copy; {currentYear}{' '}
          <a
            className={footer.footer_link}
            href="https://adamrobillard.ca"
            target="_blank"
          >
            Adam Robillard
          </a>
          . View code on{' '}
          <a
            className={footer.footer_link}
            href="https://github.com/arobillard/responsive-type"
            target="_blank"
          >
            GitHub
          </a>
        </small>
      </div>
    </footer>
  );
}
