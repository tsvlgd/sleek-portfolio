import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { ScrollTopButton } from '@/components/common/ScrollTopButton';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { SpotlightProvider } from '@/components/common/SpotlightProvider';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { TrailingCat } from '@/components/common/TrailingCat';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';

/**
 * Latin subset woff2 for both families. The previous setup shipped two TrueType
 * files totalling 264 KB with no unicode range, so every visitor downloaded
 * that to read one column.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Marks that JS is available, which is what gates the scroll reveal's
          hidden state. Runs before first paint so there is no flash, and it is
          inline so it cannot be deferred or blocked.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-reveal')`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="bg-background text-foreground sr-only rounded-full border px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Quiet blueprint field behind everything. Fixed and transform only,
              so it never repaints during a scroll. */}
          <div aria-hidden="true" className="field" />

          <SpotlightProvider />

          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <ScrollTopButton />
          </SmoothScroll>

          <TrailingCat />
        </ThemeProvider>

        <UmamiAnalytics />
      </body>
    </html>
  );
}
