import { Link } from "react-router";
import CartItem from "../Components/cartItem";
import "./Cart.css"
import { useEffect } from "react";

function CartPage({ cartItem, incrementQty, decrementQty }) {

  const TotalPrice = cartItem.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);

  return (
    <div className="main-container">
      <div className="header">
        <Link to="/"><h1>Ecommerce</h1></Link>
      </div >
      <div className="cart-block">
      <h3>Cart Page</h3>

      {cartItem.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItem.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
        ))
      )}
      </div>
      <h3>{TotalPrice}</h3>

    </div>
  );
}

export default CartPage;

