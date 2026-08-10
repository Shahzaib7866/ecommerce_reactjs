import './globals.css'
import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import Providers from '../components/Providers'
import LayoutWrapper from '../components/LayoutWrapper'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'WearIt',
  description: 'New Collections For Everyone',
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('app_theme')?.value || 'light'

  return (
    <html lang="en" className={theme === 'dark' ? 'app dark' : 'app'}>
      <body className={poppins.className} suppressHydrationWarning={true}>
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


