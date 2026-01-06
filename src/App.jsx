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

  const addToCart = (id)=>{

    console.log("working",id)
    const item = data.find((i) => i.id === id);
   
    setCartItem([...cartItem,item])
    console.log(cartItem)

  }
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

useEffect(()=>{
  console.log(data)
},[data])

  return (
    <Routes>
      <Route path="/" element={<DashBorad data={data} addToCart={addToCart} searchItem={searchItem} setSearchItem={setSearchItem} />}/>
      <Route path="/cart" element={<CartPage cartItem={cartItem}/>} />
      <Route path="/viewpage/:id" element={<ViewPage />} />
    </Routes>
    
  );
};
export default App;



