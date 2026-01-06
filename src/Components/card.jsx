import { useState } from "react";
import { Link } from "react-router";
import "./card.css"

function Card({ addToCart, id, price, description, name ,image}) {
    const [cartItem,setCartItem]=useState([])


  return (
    <div className="card">
      <img src={image} alt={name} style={{ width: '100%' }} />
      <div className="container">
        <h4><b>{name}</b></h4>
        <p>{description}</p>
        <h2>${price}</h2>
      </div>
       <div className="button-group">
      <button className="addCartButton" onClick={()=>addToCart(id)}>Add to cart</button>
      <Link to={`/viewpage/${id}`}><button className="viewButton">View</button></Link>
      </div>
    </div>
  );
}

export default Card
