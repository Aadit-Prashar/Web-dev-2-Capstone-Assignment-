import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import "./Profile.css";

const mockUser = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  avatar: "RS",
  memberSince: "January 2023",
  orders: [
    { id: "#ORD-4821", date: "Apr 18, 2026", status: "Delivered", total: 79.97 },
    { id: "#ORD-4756", date: "Mar 29, 2026", status: "Shipped", total: 49.99 },
    { id: "#ORD-4612", date: "Feb 14, 2026", status: "Delivered", total: 129.50 },
  ],
};

const statusColor = { Delivered: "#067D62", Shipped: "#0066c0", Pending: "#e47911" };

export default function Profile() {
  const { totalItems, totalPrice } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__avatar">{mockUser.avatar}</div>
        <div className="profile__info">
          <h1 className="profile__name">{mockUser.name}</h1>
          <p className="profile__email">{mockUser.email}</p>
          <p className="profile__meta">Member since {mockUser.memberSince}</p>
        </div>
        <button className="profile__edit-btn">Edit Profile</button>
      </div>

      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-value">{mockUser.orders.length}</span>
          <span className="profile__stat-label">Orders</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-value">{wishlist.length}</span>
          <span className="profile__stat-label">Wishlist</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-value">{totalItems}</span>
          <span className="profile__stat-label">In Cart</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-value">${totalPrice.toFixed(2)}</span>
          <span className="profile__stat-label">Cart Value</span>
        </div>
      </div>

      <div className="profile__section">
        <h2 className="profile__section-title">Contact Details</h2>
        <div className="profile__details">
          <div className="profile__detail-row">
            <span className="profile__detail-label">Email</span>
            <span>{mockUser.email}</span>
          </div>
          <div className="profile__detail-row">
            <span className="profile__detail-label">Phone</span>
            <span>{mockUser.phone}</span>
          </div>
          <div className="profile__detail-row">
            <span className="profile__detail-label">Address</span>
            <span>123, MG Road, Gurgaon, Haryana 122001</span>
          </div>
        </div>
      </div>

      <div className="profile__section">
        <h2 className="profile__section-title">Recent Orders</h2>
        <table className="profile__orders">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {mockUser.orders.map((order) => (
              <tr key={order.id}>
                <td className="profile__order-id">{order.id}</td>
                <td>{order.date}</td>
                <td>
                  <span
                    className="profile__status"
                    style={{ color: statusColor[order.status], borderColor: statusColor[order.status] }}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="profile__order-total">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}