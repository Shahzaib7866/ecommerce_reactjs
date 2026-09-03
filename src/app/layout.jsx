import './globals.css'
import { Playfair_Display, Outfit, Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import Providers from '../components/Providers'
import LayoutWrapper from '../components/LayoutWrapper'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'WEARIT ATELIER | Editorial Luxury Fashion',
  description: 'Precision-tailored streetwear and minimalist couture collections.',
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('app_theme')?.value || 'light'

  return (
    <html 
      lang="en" 
      className={`app ${theme} ${playfair.variable} ${outfit.variable} ${poppins.variable}`}
    >
      <head>
        {/* RemixIcon CDN Icons */}
        <link 
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" 
          rel="stylesheet" 
        />
      </head>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Toaster position="top-center" /> 
        <Providers theme={theme}>
          <LayoutWrapper>
            <div>
              {children}
            </div>
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}