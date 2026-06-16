import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <div className="empty">
        <div className="big">🛒💨</div>
        <h2>Your cart is suspiciously empty</h2>
        <p style={{ color: "var(--ink-soft)", fontWeight: 700 }}>
          Go fill it with things you'll never have to pay for.
        </p>
        <Link to="/" className="btn primary big" style={{ marginTop: 16 }}>
          Start the haul
        </Link>
      </div>
    );
  }

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <Link to="/" className="back">
        ← Keep browsing
      </Link>
      <h1 className="section-title">🛍️ Your cart</h1>

      <div className="layout-2">
        <div className="panel">
          {lines.map((l) => (
            <div className="cart-line" key={l.product.id}>
              <div className="thumb" style={{ background: l.product.bg }}>
                {l.product.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800 }}>{l.product.name}</div>
                <div className="tagline">${l.product.price} each</div>
              </div>
              <div className="qty">
                <button onClick={() => setQty(l.product.id, l.qty - 1)}>−</button>
                <b>{l.qty}</b>
                <button onClick={() => setQty(l.product.id, l.qty + 1)}>+</button>
              </div>
              <div style={{ width: 70, textAlign: "right", fontWeight: 800 }}>
                ${l.product.price * l.qty}
              </div>
              <button
                className="icon-btn"
                title="Remove"
                onClick={() => remove(l.product.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: "var(--teal)" }}>FREE 🚚</span>
          </div>
          <div className="summary-row">
            <span>Actually charged</span>
            <span style={{ color: "var(--teal)" }}>$0.00</span>
          </div>
          <div className="summary-row total">
            <span>Pretend total</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <div className="strike-note">
            🧠 You're about to feel ${total.toLocaleString()} of joy for $0.
          </div>

          <button
            className="btn primary big full"
            style={{ marginTop: 16 }}
            onClick={() => navigate("/checkout")}
          >
            Checkout →
          </button>
        </div>
      </div>
    </>
  );
}
