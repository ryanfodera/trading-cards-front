import { useState, useEffect } from "react";

// actions
import { fetchAllProducts } from "../actions/products";

// components
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ogProducts, setOgProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAllProducts()
      .then((data) => {
        if (data.success === true) {
          setOgProducts(data.products);
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
    setLoading(false);
  }, []);

  const handleSearchQueryChange = (event) => {
    if (event.target.value === "") {
      setProducts(ogProducts);
    }
    setSearchQuery(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setProducts(ogProducts.slice());
    } else {
      const filteredProducts = ogProducts.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <main className="container">
      <section>
        <h2 className="section-title">All Products</h2>
        <form onSubmit={handleSearchFormSubmit}>
          <div className="formgroup">
            <input
              type="search"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <button type="submit" className="submit-btn">
            Search
          </button>
        </form>
        <ul className="cards-ul">
          {!loading &&
            products.length > 0 &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </ul>
      </section>
    </main>
  );
}
