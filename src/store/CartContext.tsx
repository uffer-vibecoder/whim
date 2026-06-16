import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "../types";

type State = {
  lines: CartLine[];
  savedCount: number; // running tally of "money saved" by not really buying
  savedTotal: number;
};

type Action =
  | { type: "add"; product: Product }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "checkout"; total: number }
  | { type: "clear" };

const KEY = "cartwheel.v1";

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    /* ignore */
  }
  return { lines: [], savedCount: 0, savedTotal: 0 };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.product.id === action.product.id);
      const lines = existing
        ? state.lines.map((l) =>
            l.product.id === action.product.id ? { ...l, qty: l.qty + 1 } : l
          )
        : [...state.lines, { product: action.product, qty: 1 }];
      return { ...state, lines };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.product.id !== action.id) };
    case "setQty":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.product.id === action.id ? { ...l, qty: action.qty } : l))
          .filter((l) => l.qty > 0),
      };
    case "checkout":
      return {
        lines: [],
        savedCount: state.savedCount + 1,
        savedTotal: state.savedTotal + action.total,
      };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  savedCount: number;
  savedTotal: number;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  checkout: (total: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    return {
      lines: state.lines,
      itemCount,
      subtotal,
      savedCount: state.savedCount,
      savedTotal: state.savedTotal,
      add: (p) => dispatch({ type: "add", product: p }),
      remove: (id) => dispatch({ type: "remove", id }),
      setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
      checkout: (total) => dispatch({ type: "checkout", total }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
