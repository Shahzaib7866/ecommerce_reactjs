import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Shop from './Pages/Shop'
import Products from './Pages/Products';
import Footer from './Components/Footer/Footer';
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'
import Register from './Pages/Register';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
    <BrowserRouter> 

     <Navbar />
     <Routes>
      <Route path='/' element={<Shop />}/>
      <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />}/> 
      <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />}/>

<Route path='/product/:productId' element={<Products />} />

      
    <Route path='/cart' element={<Cart />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />

  </Routes>
<Footer /> 
</BrowserRouter>
    </>
  )
}

export default App









