import React, { createContext, useState } from 'react';
import all_product from '../assets/all_product'

//create 1 context and initialize with null
export const ShopContext = createContext(null);

const getDefaultCart = () =>{
  const cart = {};

  for( let i = 0; i < all_product.length+1; i++){
    cart[i] = 0;
  }
 return cart;
}


const ShopContextProvider = (props) => {

const [cartItems, setCartItems] = useState(getDefaultCart());

// console.log(cartItems);

//func. to add products in our cart
const addtoCart = (itemId) =>{
  setCartItems((prev) => ({...prev,[itemId]: prev[itemId]+1}));

  console.log(cartItems);
  
}

//func. to remove products in our cart
const removeFromCart = (itemId) =>{
  setCartItems((prev) => ({...prev,[itemId]: prev[itemId]-1}))
}

const getTotalCartAmount=() =>{
  let totalAmount = 0;

  for(const item in cartItems){

    if(cartItems[item]>0)
    {
      let itemInfo = all_product.find((product)=>product.id===Number(item));
      totalAmount += itemInfo.new_price * cartItems[item];
    }
  }
      return totalAmount;
}

//func. to count the number of item in our cart
const getTotalCartItems = () =>{
  let totalItem = 0;
  for(const item in cartItems)
  {
    if(cartItems[item]>0)
    {
      totalItem += cartItems[item];
    }
  }
  return totalItem;
}

  //MAKE variable to store data and functions which we want to access using context
const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addtoCart, removeFromCart};

  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;





