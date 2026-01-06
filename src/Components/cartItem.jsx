
function CartItem({ item}) {
  return (
    <div className="main-container" style={{ display: 'flex', border: '1px solid #ddd', padding: '10px' }}>
      <img src={item.thumbnail} alt={item.title} style={{ width: '100px' }} />
      <div>
        <h4>{item.title}</h4>
        <h4>${item.price}</h4>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button >-</button>
          <h4 style={{ margin: '0 10px' }}>quantity</h4>
          <button >+</button>
        </div>
      </div>
    </div>
  );
}
export default CartItem
