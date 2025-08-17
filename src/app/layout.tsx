import '../styles/style.css';

import ClientProviders from './ClientProviders';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'RS React App', template: '%s | RS React App' },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
