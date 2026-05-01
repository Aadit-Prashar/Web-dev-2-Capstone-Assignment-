import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import "./Productcar.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      <button
        className={`product-card__wish ${wishlisted ? "active" : ""}`}
        onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>
      <img src={product.image} alt={product.name} className="product-card__img" />
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__rating">
          {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
          <span>({product.reviews})</span>
        </div>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <button className="product-card__btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}