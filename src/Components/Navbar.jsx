import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import "./Navbar.css";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">🛒 ShopKart</Link>

      <form className="navbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="navbar__actions">
        <Link to="/wishlist" className="navbar__link">
          🤍 Wishlist
          {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
        </Link>
        <Link to="/cart" className="navbar__link">
          🛒 Cart
          {totalItems > 0 && <span className="navbar__badge">{totalItems}</span>}
        </Link>
        <Link to="/profile" className="navbar__link">👤 Account</Link>
      </div>
    </nav>
  );
}