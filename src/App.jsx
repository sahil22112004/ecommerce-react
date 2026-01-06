import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router";
import DashBorad from './pages/DashBoard';
import ViewPage from './pages/ViewPage';
import CartPage from './pages/CartPage';
import axios from 'axios'


function App() {
  const [data,setData] = useState([])
  const[searchItem,setSearchItem] = useState("")
  const [cartItem,setCartItem] = useState(()=>{
     return localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")):[]
  })

  useEffect(()=>{
    console.log("cart item change,",cartItem)
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  },[cartItem])

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setData(response.data.products)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  getData(); 

}, []);

  // ✅ ADD TO CART
  const addToCart = (id) => {
    const product = data.find((item) => item.id === id);

    const alreadyInCart = cartItem.find((item) => item.id === id);

    if (alreadyInCart) {
      setCartItem(
        cartItem.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
    }
  };

  // ✅ INCREMENT
  const incrementQty = (id) => {
    setCartItem(
      cartItem.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ DECREMENT
  const decrementQty = (id) => {
    setCartItem(
      cartItem
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  return (
    <Routes>
      <Route path="/" element={<DashBorad data={data} cartItem={cartItem} addToCart={addToCart} searchItem={searchItem} setSearchItem={setSearchItem} />}/>
      <Route path="/cart" element={<CartPage cartItem={cartItem} incrementQty={incrementQty} decrementQty={decrementQty} />} />
      <Route path="/viewpage/:id" element={<ViewPage />} />
    </Routes>
    
  );
};
export default App;



