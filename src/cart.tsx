import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, products } from './data';
import { readStored, writeStored } from './storage';

export type CartLine = { product: Product; qty: number };
type CartCtx = {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (p: Product, qty?: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
};

export const stockLimit = (product: Product) => Math.max(0, Math.floor(product.stock ?? 0));

function clampQty(product: Product, qty: number) {
  return Number.isFinite(qty) ? Math.max(0, Math.min(stockLimit(product), Math.floor(qty))) : 0;
}

function loadCart(): CartLine[] {
  const stored = readStored('shop.cart');
  if (!Array.isArray(stored)) return [];
  const lines: CartLine[] = [];
  for (const entry of stored) {
    const product = products.find((p) => p.id === entry?.product?.id);
    if (!product || typeof entry.qty !== 'number') continue;
    const existing = lines.find((line) => line.product.id === product.id);
    const qty = clampQty(product, (existing?.qty ?? 0) + clampQty(product, entry.qty));
    if (existing) existing.qty = qty;
    else if (qty) lines.push({ product, qty });
  }
  return lines;
}

const Ctx = createContext<CartCtx>({
  items: [], count: 0, subtotal: 0, add: () => {}, clear: () => {},
  increment: () => {}, decrement: () => {}, remove: () => {}, setQty: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(loadCart);
  useEffect(() => writeStored('shop.cart', items), [items]);

  const changeQty = (id: number, quantity: number | ((qty: number) => number)) => {
    setItems((prev) => prev.map((line) => line.product.id === id
      ? { ...line, qty: clampQty(line.product, typeof quantity === 'function' ? quantity(line.qty) : quantity) }
      : line).filter((line) => line.qty > 0));
  };

  return (
    <Ctx.Provider
      value={{
        items,
        count: items.reduce((sum, line) => sum + line.qty, 0),
        subtotal: items.reduce((sum, line) => sum + line.product.price * line.qty, 0),
        add: (p, quantity = 1) => setItems((prev) => {
          const product = products.find((candidate) => candidate.id === p.id);
          if (!product || !Number.isFinite(quantity) || quantity < 1) return prev;
          const existing = prev.find((line) => line.product.id === product.id);
          const qty = clampQty(product, (existing?.qty ?? 0) + Math.floor(quantity));
          if (!qty) return prev;
          return existing
            ? prev.map((line) => line.product.id === product.id ? { product, qty } : line)
            : [...prev, { product, qty }];
        }),
        increment: (id) => changeQty(id, (qty) => qty + 1),
        decrement: (id) => changeQty(id, (qty) => qty - 1),
        remove: (id) => setItems((prev) => prev.filter((line) => line.product.id !== id)),
        setQty: changeQty,
        clear: () => setItems([]),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
