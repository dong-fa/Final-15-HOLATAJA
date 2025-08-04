import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header';
import { Metadata } from 'next';
// import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: {
    default: 'HOLATAJA - 온라인 프리미엄 타건샵',
    template: '%s | 올라타자',
  },
  description:
    '키보드 전문 쇼핑몰 HOLA TAJA! 커스텀 키보드, 게이밍 키보드, 무선 키보드까지. Craft Your Perfect Keyboard로 나만의 완벽한 키보드를 찾아보세요.',
  keywords: [
    '타건샵',
    '올라타자',
    '프리미엄 타건샵',
    '온라인 타건샵',
    'NUPHY',
    '기계식키보드',
    '커스텀키보드',
    '게이밍키보드',
    '무선키보드',
    '블루투스키보드',
    '키보드쇼핑몰',
    '적축',
    '갈축',
    '청축',
    '자석축',
  ],
  authors: [{ name: '올라타자', url: 'final-15-holataja.vercel.app/' }],
  creator: 'teamXV',

  openGraph: {
    title: '올라타자',
    description: '온라인 프리미엄 타건샵',
    url: 'https://final-15-holataja.vercel.app/',
    siteName: '올라타자',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '올라타자 OG 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@holataja', // 실제 트위터 계정이 있다면
    title: 'HOLA TAJA! - NUPHY 기계식 키보드 전문 쇼핑몰',
    description: 'NUPHY 기계식 키보드 전문 쇼핑몰입니다. 커스텀 키보드부터 게이밍 키보드까지!',
    images: ['/twitter-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://final-15-holataja.vercel.app',
  },

  category: '전자제품',
  classification: 'Business',

  other: {
    'google-site-verification': 'your-google-verification-code', // Google Search Console 인증 코드
    'naver-site-verification': 'your-naver-verification-code', // 네이버 웹마스터 인증 코드
    'product-type': 'Mechanical Keyboard',
    'price-range': '199000-299000 KRW',
  },
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
