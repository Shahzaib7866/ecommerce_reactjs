'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import CartDrawer from './cartDrawer/cartdrawer'

// Aapki website ke valid public routes ki list
const publicRoutes = [
  '/',
  '/shop',
  '/men',
  '/women',
  '/kids',
  '/cart',
  '/checkoutform'
  // agar koi aur public page ho toh yahan add kardein
]

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  
  // Check karein ke kya current route explicitly public routes ki list mein hai 
  // ya phir kisi valid public sub-route se start ho raha hai (jaise /shop/product-id)
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/shop/') || pathname.startsWith('/product/')

  return (
    <>
      {isPublicRoute && <Navbar />}
      {isPublicRoute && <CartDrawer />}
      
      <div style={{ paddingTop: isPublicRoute ? '68px' : '0px' }}>
        {children}
      </div>

      {isPublicRoute && <Footer />}
    </>
  )
}