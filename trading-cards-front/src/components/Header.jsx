import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="nav container">
        <Link className="navbrand" to="/">
          PokeCards
        </Link>
        <Link className="add-product" to="/products/add">
          Add Product +
        </Link>
      </nav>
    </header>
  );
}
