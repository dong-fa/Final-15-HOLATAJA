import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="text-sm sm:text-base">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-5xl px-4 mx-auto sm:px-6 lg:px-8 border-b-1 border-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
