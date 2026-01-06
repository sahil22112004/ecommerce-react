import "./cartItem.css"

function CartItem({ item, incrementQty, decrementQty }) {
  return (
    <div className="main-container">
      <img src={item.thumbnail} alt={item.title} width="100" />

      <div style={{ marginLeft: "20px" }}>
        <h4>{item.title}</h4>
        <h4>${item.price}</h4>

        <div>
          <button onClick={() => decrementQty(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => incrementQty(item.id)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
