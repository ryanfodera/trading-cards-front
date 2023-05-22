import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editSingleProduct, fetchSingleProduct } from "../actions/products";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    fetchSingleProduct(id)
      .then((data) => {
        if (data.success === true) {
          setFormFields(data.product);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const productObj = { ...formFields };
    delete productObj.createdAt;
    delete productObj.updatedAt;
    const data = await editSingleProduct(productObj);
    if (data.success === true) {
      navigate(`/products/${formFields.id}`);
    } else {
      alert(data.error);
    }
  };

  if (!formFields.id) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <main className="container">
      <section>
        <form onSubmit={handleFormSubmit}>
          <h3 className="form-title">Edit Product</h3>
          <div className="formgroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={formFields.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              value={formFields.price}
              name="price"
              onChange={handleInputChange}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              value={formFields.rating}
              name="rating"
              onChange={handleInputChange}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="rating">Rating</label>
            <select
              name="featured"
              value={formFields.featured}
              onChange={handleInputChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="formgroup">
            <label htmlFor="imageURL">Image URL</label>
            <input
              type="text"
              value={formFields.imageURL}
              name="imageURL"
              onChange={handleInputChange}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              value={formFields.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Edit Product
          </button>
        </form>
      </section>
    </main>
  );
}
