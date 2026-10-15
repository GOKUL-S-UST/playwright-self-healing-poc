import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './data';

type CartCtx = {
  items: Product[];
  add: (p: Product) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx>({ items: [], add: () => {}, clear: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  return (
    <Ctx.Provider
      value={{
        items,
        add: (p) => setItems((prev) => [...prev, p]),
        clear: () => setItems([]),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
