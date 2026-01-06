import { useEffect, useState } from "react";
import Card from "../Components/card";
import "./DashBoard.css";
import { Link } from "react-router";

function DashBorad({ data, addToCart, cartItem }) {
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() =>{const fetchSearch = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchItem}`
      );
      const response = await res.json();
      setSearchResults(response.products);
    };

     fetchSearch();
  },2000)
   return () => clearTimeout(timer);
  }, [searchItem]);

  const displayProducts =
    searchItem.trim() !== "" ? searchResults : data;

  return (
    <>
      <header>
        <h1>DashBoard</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />

        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </header>

      <main>
        {displayProducts.length > 0 ? (
          displayProducts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              image={item.thumbnail}
              name={item.brand}
              description={item.description}
              price={item.price}
              addToCart={addToCart}
              cartItem={cartItem}
            />
          ))
        ) : (
         <p>No products found</p>
        )}
      </main>

      <footer>Ecommerce site</footer>
    </>
  );
}

export default DashBorad;
