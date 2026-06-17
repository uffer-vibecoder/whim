import { useEffect, useState } from "react";
import { formatEta, limitedEndsAt } from "../lib/time";

/**
 * A "limited drop" countdown that's deliberately in on the joke — urgency as a
 * gag, not a guilt trip. It always comes back, and it's always free.
 */
export default function LimitedCountdown({ id }: { id: string }) {
  const [endsAt, setEndsAt] = useState(() => limitedEndsAt(id));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => {
      const n = Date.now();
      setNow(n);
      // When this window lapses, quietly roll to the next one (it's back!).
      setEndsAt((e) => (n >= e ? limitedEndsAt(id) : e));
    }, 1000);
    return () => window.clearInterval(t);
  }, [id]);

  const remaining = Math.max(0, (endsAt - now) / 1000);

  return (
    <div className="limited-chip">
      <span className="limited-pulse">⏳</span>
      <span>
        <b>Limited drop</b> · ends in {formatEta(remaining)}
        <span className="limited-wink"> — then it's back, it's free, relax 💅</span>
      </span>
    </div>
  );
}
