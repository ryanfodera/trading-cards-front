import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ProductCard({ product }) {
  const intToPrice = (num) => {
    return num.toFixed(2);
  };

  return (
    <Link className="card" to={`/products/${product.id}`}>
      <div className="image-section">
        <img src={product.imageURL} alt="Product" />
      </div>
      <div className="text-section">
        <h3>{product.name}</h3>
        <p>Rating: {product.rating}/5</p>
        <h4 className="price">${intToPrice(product.price)}</h4>
      </div>
    </Link>
  );
}