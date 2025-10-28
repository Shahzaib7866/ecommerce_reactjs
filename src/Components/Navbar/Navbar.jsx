
import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '/src/assets/logo.png'
import cart_icon from '/src/assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {getTotalCartItems} = useContext(ShopContext);

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
  }

  return (
    <>
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>

        <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-menu-wrapper ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className='nav-menu'>
            <li onClick={()=>{handleMenuClick("shop")}}> 
              <Link style={{textDecoration: 'none'}} to='/'>Shop</Link>  
              {menu==="shop"?<hr/>: <></>} 
            </li>
            <li onClick={()=>{handleMenuClick("men")}}> 
              <Link style={{textDecoration: 'none'}} to='/men'>Men</Link>  
              {menu==="men"?<hr/>: <></>}
            </li>
            <li onClick={()=>{handleMenuClick("women")}}> 
              <Link style={{textDecoration: 'none'}} to='/women'>Women</Link> 
              {menu==="women"?<hr/>: <></>}
            </li>
            <li onClick={()=>{handleMenuClick("kids")}}> 
              <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> 
              {menu==="kids"?<hr/>: <></>}
            </li>
          </ul>

          <div className='nav-login-cart mobile-only'>
            <Link to='/cart' onClick={() => setMobileMenuOpen(false)}>
              <div className='mobile-cart-item'>
                <img src={cart_icon} alt="" /> 
                <span>Cart</span>
                <div className="nav-cart-count">
                  {getTotalCartItems()}
                </div>
              </div>
            </Link>
            <Link to='/login' onClick={() => setMobileMenuOpen(false)}> 
              <button>Login</button>
            </Link>
          </div>
        </div>

        <div className='nav-login-cart desktop-only'>
          <Link to='/login'> <button>Login</button></Link>
          <Link to='/cart'><img src={cart_icon} alt="" /> </Link>
          <div className="nav-cart-count">
            {getTotalCartItems()}
          </div>
        </div>
    </div>
    </>
  )
}

export default Navbar













