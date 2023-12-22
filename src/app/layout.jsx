import { Noto_Sans, Noto_Serif } from 'next/font/google';
import './styles/global.css';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

const noto_serif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
});

export const metadata = {
  title: 'Responsive Type',
  description: 'Generate responsive type styles for websites.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-CA"
      className={`${noto_sans.variable} ${noto_serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
