
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Keep original font imports
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils"; // Import cn utility

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure Roboto Mono font
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
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
    // Apply font variables using cn utility on the html tag
    <html lang="en" className={cn("antialiased", inter.variable, roboto_mono.variable)} suppressHydrationWarning>
      {/* Use body for base font application */}
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
