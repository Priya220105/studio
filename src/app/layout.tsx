import type { Metadata } from 'next';
// Replace Geist fonts with standard Google Fonts
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Use a standard variable name
});

// Configure Roboto Mono font
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono', // Use a standard variable name
});


export const metadata: Metadata = {
  title: 'BidCraft',
  description: 'Project bidding app for freelancers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variables to the html tag for global scope
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className={`antialiased`}> {/* Removed font class from body, it's on html now */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
