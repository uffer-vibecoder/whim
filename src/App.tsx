import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./store/CartContext";
import { isSoundOn, setSound } from "./lib/dopamine";
import Storefront from "./pages/Storefront";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";

function Header() {
  const { itemCount, savedTotal } = useCart();
  const [sound, setS] = useState(isSoundOn());
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="mark">🛒</span>
        <span>
          Cart<b>wheel</b>
        </span>
      </Link>
      <div className="spacer" />
      {savedTotal > 0 && (
        <span className="pill saved" title="Money you didn't actually spend">
          🪙 ${savedTotal.toLocaleString()} saved
        </span>
      )}
      <button
        className="icon-btn"
        title={sound ? "Mute sounds" : "Unmute sounds"}
        onClick={() => {
          const next = !sound;
          setSound(next);
          setS(next);
        }}
      >
        {sound ? "🔊" : "🔇"}
      </button>
      <button className="pill cart-pill" onClick={() => navigate("/cart")}>
        🛍️ Cart <span className="count">{itemCount}</span>
      </button>
    </header>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/p/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
      <footer className="footer">
        <div>
          Cartwheel is a <b>dopamine store</b> — a parody. Nothing is for sale, no card is
          charged, nothing ships. 💸
        </div>
        <div>All the thrill of the haul, none of the bill. Made for fun.</div>
      </footer>
    </div>
  );
}
