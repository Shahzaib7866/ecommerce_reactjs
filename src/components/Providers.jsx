'use client'
import ShopContextProvider from '../context/ShopContext'
import ThemeContextProvider from '../context/ThemeProvider'

export default function Providers({ children, theme }) {
  return (
    <ThemeContextProvider initialTheme={theme}>
      <ShopContextProvider>{children}</ShopContextProvider>
    </ThemeContextProvider>
  )
}