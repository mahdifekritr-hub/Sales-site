import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Real Estate Software - PropertyCareApp Sales System',
  description: 'We are based in Canada and operate internationally, Our mission is to bring innovation and automation to building projects by providing powerful, AI-driven tools that simplify unit presentation, sales coordination, and customer interaction.',
  keywords: 'sales software, lead tracking, real estate software, sales software for developers, sales software for real estates, property care app',
  generator: 'v0.app',
  openGraph: {
    title: 'real-estate-software for developers',
    description: 'We are based in Canada and operate internationally, Our mission is to bring innovation and automation to building projects by providing powerful, AI-driven tools that simplify unit presentation, sales coordination, and customer interaction.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-background overflow-x-hidden">
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
