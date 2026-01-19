import type { Metadata } from 'next';
import { Orbitron, Rajdhani, Space_Mono, Geist } from 'next/font/google';
import './globals.css';
import GameShell from '@/components/layout/GameShell';
import GameManager from '@/components/GameManager';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Star Vein Idle',
  description: 'An idle space mining game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${spaceMono.variable} ${geistSans.variable} antialiased`}
      >
        <GameManager />
        <GameShell>
          <div className="rounded-box h-full p-3">{children}</div>
        </GameShell>
      </body>
    </html>
  );
}
