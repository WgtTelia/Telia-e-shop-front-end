import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import localFont from 'next/font/local';
import { SortProvider } from '@/context/SortContext';

const helveticaNeue = localFont({
  src: [
    {
      path: '../../public/fonts/HelveticaNeueCyr-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueCyr-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio Project powered by Telia',
  description:
    'This group assignment is tailored for back-end, front-end, and QA specialists. The objective is to collaboratively create a simple, functional e-shop while honing essential teamwork and collaboration skills',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${helveticaNeue.variable} font-sans`}>
      <body>
        <SortProvider>{children}</SortProvider>
      </body>
    </html>
  );
}
