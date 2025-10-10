"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { Product } from "@/lib/data";

export type CartItem = {
  id: string; // product id
  name: string;
  price: number;
  imageId?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "SET_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: CartState };

const STORAGE_KEY = "gauree_cart_v1";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, 99) } : i
          ),
        };
      }
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageId: product.imageId,
        quantity,
      };
      return { items: [...state.items, newItem] };
    }
    case "REMOVE_ITEM": {
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    }
    case "SET_QUANTITY": {
      const { id, quantity } = action.payload;
      return {
        items: state.items
          .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, Math.min(quantity, 99)) } : i))
          .filter((i) => i.quantity > 0),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number; // total items (sum quantities)
  total: number; // subtotal price
  isReady: boolean; // hydrated from storage
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isReady, setIsReady] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {}
    setIsReady(true);
  }, []);

  // Persist to localStorage whenever state changes (after hydration)
  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, isReady]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const total = state.items.reduce((acc, i) => acc + i.quantity * i.price, 0);
    return {
      items: state.items,
      addItem: (product, quantity = 1) => dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      setQuantity: (id, quantity) => dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
      clear: () => dispatch({ type: "CLEAR" }),
      count,
      total,
      isReady,
    };
  }, [state, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
