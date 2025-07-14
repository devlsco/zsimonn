import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import { MetaData } from '@/config/Metadata';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Simon's Socials",
  description: 'Streamer, Content Creator, and Twitch Moderator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${firaCode.variable} dark`}>
      <body className="min-h-screen antialiased dark:bg-gray-900 dark:text-white">{children}</body>
    </html>
  );
}
