

import './globals.css'
// import Navbar from '../components/Navbar/Navbar'
// import Footer from '../components/Footer/Footer'
import { Poppins } from 'next/font/google'
import Providers from '../components/Providers'
// import CartDrawer from '../components/cartDrawer/cartdrawer'
import LayoutWrapper from '../components/LayoutWrapper'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'WearIt',
  description: 'New Collections For Everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="app">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Providers>
           {/* <Navbar /> 
          <CartDrawer />  */}
          <LayoutWrapper>
          {/* <div style={{ paddingTop: '18px' }}> */}
          <div>
            {children}
          </div>
            </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}







