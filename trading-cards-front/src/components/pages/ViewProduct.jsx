import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

//actions
import { deleteSingleProduct, fetchSingleProduct } from "../actions/products";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchSingleProduct(id)
      .then((data) => {
        if (data.success === true) {
          setProduct(data.product);
        } else {
          navigate("/");
        }
      })
      .catch(console.error);
    setLoading(false);
  }, [id, navigate]);

  const handleDelete = async () => {
    const data = await deleteSingleProduct(product.id);
    if (data.success === true) {
      navigate("/");
    }
  };

  if (loading || !product.id) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <main className="container">
      <section className="view-product">
        <div className="text-section">
          <h1>{product.name}</h1>
          <p className="rating">Rating: {product.rating} / 5</p>
          <p>Featured Product: {product.featured ? "Yes" : "No"}</p>
          <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
          <h3 className="price">${product.price?.toFixed(2)}</h3>
          <p className="description">{product.description}</p>
          <div className="button-group">
            <button>
              <Link to={`/products/edit/${product.id}`}>Edit Product</Link>
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete Product
            </button>
          </div>
        </div>
        <div className="img-section">
          <img src={product.imageURL} alt="" />
        </div>
      </section>
    </main>
  );
}
