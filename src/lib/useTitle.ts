import { useEffect } from "react";

const BASE = "whim — all the shopping, none of the spending";

/** Sets the document title for a page, restoring the base title on unmount. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · whim` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
}
