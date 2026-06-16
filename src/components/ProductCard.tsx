import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../store/CartContext";
import { playPop, popConfetti } from "../lib/dopamine";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.was
    ? Math.round((1 - product.price / product.was) * 100)
    : 0;

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    add(product);
    playPop();
    const r = e.currentTarget.getBoundingClientRect();
    popConfetti(
      (r.left + r.width / 2) / window.innerWidth,
      (r.top + r.height / 2) / window.innerHeight
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  }

  return (
    <Link to={`/p/${product.id}`} className="card">
      <div className="thumb" style={{ background: product.bg }}>
        {discount > 0 && <span className="deal">-{discount}%</span>}
        <span className="heart">🤍</span>
        <span>{product.emoji}</span>
      </div>
      <div className="body">
        <div className="name">{product.name}</div>
        <div className="tagline">{product.tagline}</div>
        <div className="stars">
          <span className="s">★★★★★</span>
          {product.rating} · {(product.reviewCount / 1000).toFixed(1)}k
        </div>
        <div className="price-row">
          <span className="price">${product.price}</span>
          {product.was && <span className="was">${product.was}</span>}
        </div>
        <button
          className={`btn primary full add-btn ${added ? "added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "Added! 🎉" : "Add to cart"}
        </button>
      </div>
    </Link>
  );
}
