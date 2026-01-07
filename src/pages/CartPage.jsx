import { Link } from "react-router";
import CartItem from "../Components/cartItem";
import "./Cart.css"

function CartPage({ cartItem, incrementQty, decrementQty }) {
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
    </div>
  );
}

export default CartPage;

