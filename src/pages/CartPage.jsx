import CartItem from "../Components/cartItem.jsx";

function CartPage({ cartItem }) {
  return (
     <div className="cart-container">
       <h1>Cart Page</h1>
       {cartItem.length === 0 ? (
         <p>Your cart is empty</p>
       ) : (
         cartItem.map((item) => (
           <CartItem 
             key={item.id} 
             item={item} 
           />
         ))
       )}
    </div>
    
  );
}
export default CartPage
