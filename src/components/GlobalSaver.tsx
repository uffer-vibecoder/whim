import { useEffect, useRef, useState } from "react";
import { useCart } from "../store/CartContext";

// A theatrical-but-grounded "worldwide savings" meter. The base climbs from a fixed
// anchor in real time (so it never resets on refresh and always feels alive), and the
// visitor's own "money saved by not buying" is folded in on top.
const ANCHOR_MS = Date.UTC(2026, 5, 1); // Jun 1, 2026
const ANCHOR_VALUE = 4_800_000;
const RATE = 9.0; // dollars/second the world "saves" by not checking out

function computeGlobal(userSaved: number): number {
  const secs = Math.max(0, (Date.now() - ANCHOR_MS) / 1000);
  return ANCHOR_VALUE + secs * RATE + userSaved;
}

export default function GlobalSaver() {
  const { savedTotal } = useCart();
  const [val, setVal] = useState(() => computeGlobal(savedTotal));
  const savedRef = useRef(savedTotal);
  savedRef.current = savedTotal;

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const tick = () => setVal(computeGlobal(savedRef.current));
      tick();
      const timer = window.setInterval(tick, 2000);
      return () => clearInterval(timer);
    }
    let raf = 0;
    const loop = () => {
      setVal(computeGlobal(savedRef.current));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const perMinute = Math.round(RATE * 60);

  return (
    <section className="global-saver" aria-label="Money saved worldwide, live">
      <div className="gs-label">
        <span className="gs-live" /> Saved by not buying · worldwide, live
      </div>
      <div className="gs-amount" aria-live="off">
        ${Math.floor(val).toLocaleString()}
      </div>
      <div className="gs-footrow">
        <span className="gs-chip">≈ ${perMinute.toLocaleString()}/min</span>
        <span className="gs-sub">…and counting. Every cart you don't check out adds to it. 🎉</span>
      </div>
    </section>
  );
}
