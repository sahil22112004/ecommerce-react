import { useEffect, useState } from "react";
import Card from "../Components/card";
import "./DashBoard.css";
import { Link } from "react-router";

function DashBorad({ data, addToCart, page, setPage, total }) {
  const LIMIT = 10;
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSearch = async () => {
        if (searchItem.trim() === "") {
          setSearchResults([]);
          return;
        }

        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchItem}`
        );
        const response = await res.json();

        setSearchResults(response.products);
      };

      fetchSearch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (searchItem.trim() !== "") {
      setPage(1);
    }
  }, [searchItem]);

  const isSearching = searchItem.trim() !== "";
  const displayProducts = isSearching ? searchResults : data;
  const totalPages = Math.ceil(total / LIMIT);

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
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </main>

      {!isSearching && (
        <div className="paging-section">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      <footer>Ecommerce site</footer>
    </>
  );
}

export default DashBorad;
