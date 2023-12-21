import './styles/global.css';

export const metadata = {
  title: 'Responsive Type',
  description: 'Generate responsive type styles for websites.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
