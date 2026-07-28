
import './admin.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Poppins } from 'next/font/google'
import Providers from '../components/Providers'
import CartDrawer from '../components/cartDrawer/cartdrawer'
import Sidebar from './Admincomponents/sidebar/Sidebar'

// const poppins = Poppins({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700']
// })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'New Collections For Everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Providers>
            <div className='main flex'>
<div>
    <Sidebar />
</div>
          <Navbar />
          <div style={{ paddingTop: '68px' }}>
            {children}
            <Footer />
          </div>
           </div>
        </Providers>
    

      </body>
    </html>
  )
}

