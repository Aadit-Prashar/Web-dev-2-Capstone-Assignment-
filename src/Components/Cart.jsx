import { useCart } from "./CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", color: "#555" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🛒</div>
        <h2 style={{ color: "#0f1111", marginBottom: "8px" }}>Your cart is empty</h2>
        <p>Add items to get started.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart__title">Shopping Cart ({totalItems} items)</h2>

      <div className="cart__layout">
        {/* Cart Items */}
        <div className="cart__items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart__item">
              <img src={item.image} alt={item.name} className="cart__item-img" />
              <div className="cart__item-details">
                <p className="cart__item-name">{item.name}</p>
                <p className="cart__item-price">${item.price.toFixed(2)}</p>
                <div className="cart__item-actions">
                  <div className="cart__qty">
                    <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart__remove" onClick={() => removeFromCart(item.id)}>
                    🗑 Remove
                  </button>
                </div>
              </div>
              <p className="cart__item-subtotal">${(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart__summary">
          <h3 className="cart__summary-title">Order Summary</h3>
          <div className="cart__summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Shipping</span>
            <span style={{ color: "#067D62" }}>FREE</span>
          </div>
          <div className="cart__summary-row cart__summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="cart__checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}