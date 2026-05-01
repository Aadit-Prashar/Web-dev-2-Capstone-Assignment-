import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";
import "./Wishlist.css";

export default function Whishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", color: "#555" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🤍</div>
        <h2>Your wishlist is empty</h2>
        <p>Save items you love and come back anytime.</p>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h2 className="wishlist__title">My Wishlist ({wishlist.length})</h2>
      <div className="wishlist__grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist__card">
            <button className="wishlist__remove" onClick={() => removeFromWishlist(product.id)}>✕</button>
            <img src={product.image} alt={product.name} className="wishlist__img" />
            <div className="wishlist__info">
              <p className="wishlist__name">{product.name}</p>
              <p className="wishlist__price">${product.price.toFixed(2)}</p>
              <button className="wishlist__add-btn" onClick={() => { addToCart(product); removeFromWishlist(product.id); }}>
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}