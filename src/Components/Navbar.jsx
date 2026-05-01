import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [search, setSearch] = useState("");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">🛒 ShopKart</Link>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="navbar__actions">
        <Link to="/wishlist" className="navbar__link">
          🤍 Wishlist
          {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
        </Link>
        <Link to="/" className="navbar__link">
          🛒 Cart
          {totalItems > 0 && <span className="navbar__badge">{totalItems}</span>}
        </Link>
        <Link to="/profile" className="navbar__link">👤 Account</Link>
      </div>
    </nav>
  );
}