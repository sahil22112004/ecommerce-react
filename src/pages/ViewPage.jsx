import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import "./ViewPage.css"
import axios from 'axios'
import { Link } from "react-router";

function ViewPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    if (id) getProduct();
  }, [id]);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="main-container">
        <div>
           <Link to="/"><button>Home</button></Link>
            <Link to="/cart"><button>Cart</button></Link>
        </div>
    <div className="info-container">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <h4>Price: ${product.price}</h4>
    </div>
    </div>
  );
}

export default ViewPage;
