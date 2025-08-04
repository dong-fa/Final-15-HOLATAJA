import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header';
// import { SessionProvider } from 'next-auth/react';

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
