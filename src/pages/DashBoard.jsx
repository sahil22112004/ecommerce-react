
import Card from "../Components/card"
import './DashBoard.css'
import { Link } from "react-router";

function DashBorad({ data ,addToCart, searchItem, setSearchItem}) {
  

  return (
    <>
      <header>
        <h1>DashBoard</h1>
        <input 
        type="text" 
        placeholder="search your product....."
        value={searchItem}
        onChange={(e)=>e.target.value}
        />
         <Link to="/cart"><button>Cart</button></Link>
      </header>
      <main>
        {data && data.map((item) => (
          <Card 
          key={item.id}
          id={item.id}
          image={item.thumbnail} 
          name={item.brand}
          description={item.description}
          price ={item.price}
          addToCart={addToCart}
          
          />
        ))}
      </main>
      <footer>Ecommerce site</footer>
    </>
  );
}

export default DashBorad