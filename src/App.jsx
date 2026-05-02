import { CartProvider } from "./Components/CartContext";
import { WishlistProvider } from "./Components/WishlistContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Whishlist from "./Components/Whishlist";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import Cart from "./Components/Cart";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Whishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;