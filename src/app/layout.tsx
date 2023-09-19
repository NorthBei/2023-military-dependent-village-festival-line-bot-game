import './globals.css';
import 'slick-carousel/slick/slick.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '轉生遇眷你闖關卡'
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
