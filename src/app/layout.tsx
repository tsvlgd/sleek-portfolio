import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { SearchCommand } from '@/components/common/SearchCommand';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import ReactLenis from 'lenis/react';

import './globals.css';

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-hanken-grotesk antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis root>
            <Navbar />
            <SearchCommand />
            {children}
            <OnekoCat />
            <Quote />
            <Footer />
            <UmamiAnalytics />
            <div className="from-background via-background/80 pointer-events-none fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent [mask-image:linear-gradient(to_top,black,transparent)] backdrop-blur-[2px]" />
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
