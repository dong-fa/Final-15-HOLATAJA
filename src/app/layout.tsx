import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
// import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: '/icon/favicon_light.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/icon/favicon_dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      url: '/icon/favicon_light.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionProvider>
    <html lang="ko" className="text-sm sm:text-base">
      <body className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-5xl p-4 mx-auto sm:p-6 lg:p-8">{children}</main>
        <Footer />
      </body>
    </html>
    // </SessionProvider>
  );
}
