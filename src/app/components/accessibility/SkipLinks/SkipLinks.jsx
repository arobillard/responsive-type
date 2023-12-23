import skipLinks from './skipLinks.module.css';

export default function SkipLinks() {
  return (
    <ul className={skipLinks.skipLinks}>
      <li>
        <a className={skipLinks.skipLinks_link} href="#controls">
          Skip to controls
        </a>
      </li>
      <li>
        <a className={skipLinks.skipLinks_link} href="#preview">
          Skip to previews
        </a>
      </li>
    </ul>
  );
}
