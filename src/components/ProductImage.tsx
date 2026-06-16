import { useState } from "react";
import type { Product } from "../types";
import { unsplash } from "../data/products";

/**
 * Renders a product's real photo (Unsplash) that fades in once loaded, sitting on
 * its gradient as a placeholder. Falls back to the emoji on missing/failed images.
 */
export default function ProductImage({
  product,
  w,
  h,
  emojiSize,
}: {
  product: Product;
  w: number;
  h: number;
  emojiSize: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!product.image || failed) {
    return (
      <span className="prod-emoji" style={{ fontSize: emojiSize }}>
        {product.emoji}
      </span>
    );
  }

  return (
    <>
      {!loaded && (
        <span className="prod-emoji prod-emoji-ghost" style={{ fontSize: emojiSize }}>
          {product.emoji}
        </span>
      )}
      <img
        className={`prod-img ${loaded ? "is-loaded" : ""}`}
        src={unsplash(product.image, w, h)}
        alt={product.name}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
