import type { Metadata, Viewport } from 'next'
import { Noto_Serif_Bengali, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ServiceWorkerRegistration } from '@/components/service-worker-registration'
import './globals.css'

const notoSerifBengali = Noto_Serif_Bengali({ 
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'আপন দুনিয়া | তাসনিমুল হাসান সিয়াম',
  description: 'আপন দুনিয়া - ১০০টি বাংলা কবিতার সংকলন। জীবন, প্রেম, প্রকৃতি, বন্ধুত্ব, সময়, স্বপ্ন, আশা, মানবতা নিয়ে কবিতা।',
  keywords: ['বাংলা কবিতা', 'কবিতা', 'আপন দুনিয়া', 'তাসনিমুল হাসান সিয়াম', 'Bengali poetry', 'poetry book'],
  authors: [{ name: 'তাসনিমুল হাসান সিয়াম' }],
  creator: 'তাসনিমুল হাসান সিয়াম',
  publisher: 'তাসনিমুল হাসান সিয়াম',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'আপন দুনিয়া',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'book',
    locale: 'bn_BD',
    title: 'আপন দুনিয়া | তাসনিমুল হাসান সিয়াম',
    description: 'আপন দুনিয়া - ১০০টি বাংলা কবিতার সংকলন',
    siteName: 'আপন দুনিয়া',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className="bg-background">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="আপন দুনিয়া" />
      </head>
      <body className={`${notoSerifBengali.variable} ${geistMono.variable} font-serif antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ServiceWorkerRegistration />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
