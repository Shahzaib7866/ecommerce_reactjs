import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
    <BrowserRouter> 

     <Navbar />
     <Routes>
      <Route path='/' element={<Shop />}/>
      <Route path='/men' element={<ShopCategory />}/> 
      <Route path='/women' element={<Shop />}/>
      <Route path='/kids' element={<Shop />}/>
      <Route path='/product' element={<Shop />}/>
      <Route path=':productId' element={<Product />}/>
     </Routes>

</BrowserRouter>
    </>
  )
}

export default App









