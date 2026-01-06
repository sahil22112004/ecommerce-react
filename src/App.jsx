import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import DashBorad from "./pages/DashBoard";
import ViewPage from "./pages/ViewPage";
import CartPage from "./pages/CartPage";
import axios from "axios";

function App() {
  const LIMIT = 10; 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);    
  const [total, setTotal] = useState(0); 
  const [cartItem, setCartItem] = useState(() => {
    return localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    const getData = async () => {
      try {
        const skip = (page - 1) * LIMIT; 

        const response = await axios.get(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
        );

        setData(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [page]);

  const addToCart = (id) => {
    const product = data.find((item) => item.id === id);
    const existing = cartItem.find((item) => item.id === id);

    if (existing) {
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

  const incrementQty = (id) => {
    setCartItem(
      cartItem.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

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
      <Route path="/" element={<DashBorad
            data={data}
            addToCart={addToCart}
            page={page}         
            setPage={setPage}    
            total={total}        
          />
        }
      />
      <Route path="/cart" element={<CartPage
            cartItem={cartItem}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
        }
      />
      <Route path="/viewpage/:id" element={<ViewPage/>} />
    </Routes>
  );
}

export default App;


