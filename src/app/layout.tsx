import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-5xl px-4 sm:px-6 lg:px-8 w-full mx-auto flex-1 border-b-1 border-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
