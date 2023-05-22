import { useState } from "react";
import { useNavigate } from "react-router-dom";

// actions
import { addProduct } from "../actions/products";

export default function AddProduct() {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    price: 0,
    featured: false,
    rating: 0,
    imageURL: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await addProduct(formFields);
    if (data.success === true) {
      setFormFields({
        name: "",
        description: "",
        price: 0,
        featured: false,
        rating: 0,
        imageURL: "",
      });
      navigate(`/products/${data.product.id}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="container">
      <section>
        <form onSubmit={handleFormSubmit}>
          <h3 className="form-title">Add Product</h3>
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
              onChange={handleInputChange}
              value={formFields.description}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
}
