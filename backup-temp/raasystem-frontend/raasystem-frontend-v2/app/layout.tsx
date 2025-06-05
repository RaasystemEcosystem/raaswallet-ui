// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Raasystem',
  description: 'AI-Driven Trading & Financial Ecosystem',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
