import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { bigCelebration, playChaChing } from "../lib/dopamine";

export type ActiveOrder = {
  name: string;
  address: string;
  city: string;
  items: { emoji: string; name: string }[];
  total: number;
  placedAt: number;
};

export default function Checkout() {
  const { lines, subtotal, checkout } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });
  const [placing, setPlacing] = useState(false);

  if (lines.length === 0 && !placing) {
    return (
      <div className="empty">
        <div className="big">🧾</div>
        <h2>Nothing to check out (yet)</h2>
        <Link to="/" className="btn primary big" style={{ marginTop: 16 }}>
          Go add some joy
        </Link>
      </div>
    );
  }

  const ready =
    form.name.trim() && form.address.trim() && form.city.trim() && form.zip.trim();

  function set(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function placeOrder() {
    if (!ready) return;
    setPlacing(true);
    playChaChing();
    bigCelebration();

    const order: ActiveOrder = {
      name: form.name.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      items: lines.map((l) => ({ emoji: l.product.emoji, name: l.product.name })),
      total: subtotal,
      placedAt: Date.now(),
    };
    try {
      sessionStorage.setItem("cartwheel.order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    checkout(subtotal);
    window.setTimeout(() => navigate("/tracking"), 700);
  }

  return (
    <>
      <Link to="/cart" className="back">
        ← Back to cart
      </Link>
      <h1 className="section-title">🧾 Checkout</h1>

      <div className="layout-2">
        <div className="panel">
          <h3 style={{ marginBottom: 14 }}>🚚 Ship it to…</h3>
          <label className="field">
            <span>Full name</span>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Alex Dopamine"
            />
          </label>
          <label className="field">
            <span>Street address</span>
            <input
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="123 Serotonin Ave"
            />
          </label>
          <div className="row-2">
            <label className="field">
              <span>City</span>
              <input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Feelgood"
              />
            </label>
            <label className="field">
              <span>ZIP</span>
              <input
                value={form.zip}
                onChange={(e) => set("zip", e.target.value)}
                placeholder="00000"
                inputMode="numeric"
              />
            </label>
          </div>

          <h3 style={{ margin: "8px 0 14px" }}>💳 Payment</h3>
          <label className="field">
            <span>Card number (don't worry, it goes nowhere)</span>
            <input
              value={form.card}
              onChange={(e) => set("card", e.target.value)}
              placeholder="•••• •••• •••• 0000"
              inputMode="numeric"
            />
          </label>
          <div className="strike-note">
            🔒 This form is fake. Nothing is sent, stored, or charged. Type gibberish.
          </div>
        </div>

        <div className="panel">
          <h3 style={{ marginBottom: 12 }}>Order summary</h3>
          {lines.map((l) => (
            <div className="summary-row" key={l.product.id}>
              <span>
                {l.product.emoji} {l.product.name} × {l.qty}
              </span>
              <span>${l.product.price * l.qty}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: "var(--teal)" }}>FREE</span>
          </div>
          <div className="summary-row total">
            <span>You'll be "charged"</span>
            <span style={{ color: "var(--teal)" }}>$0.00</span>
          </div>
          <div style={{ textAlign: "right", color: "var(--ink-soft)", fontWeight: 700 }}>
            (pretend total ${subtotal.toLocaleString()})
          </div>

          <button
            className="btn primary big full"
            style={{ marginTop: 16 }}
            disabled={!ready || placing}
            onClick={placeOrder}
          >
            {placing ? "🎉 Placing order…" : "✨ Place order for $0"}
          </button>
        </div>
      </div>
    </>
  );
}
