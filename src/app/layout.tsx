
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
  title: 'Freelaunch', // Changed title
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
      {/* Use body for base font application and add suppressHydrationWarning */}
      <body className="font-sans" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
