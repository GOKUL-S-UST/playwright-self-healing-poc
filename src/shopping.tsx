import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { products } from './data';
import { readStored, writeStored } from './storage';

function loadIds(key: string): number[] {
  const stored = readStored(key);
  return Array.isArray(stored)
    ? [...new Set(stored.filter((id): id is number => products.some((p) => p.id === id)))]
    : [];
}

const ShoppingContext = createContext<{
  wishlist: number[];
  recent: number[];
  toggleWishlist: (id: number) => void;
  recordView: (id: number) => void;
}>({ wishlist: [], recent: [], toggleWishlist: () => {}, recordView: () => {} });

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState(() => loadIds('shop.wishlist'));
  const [recent, setRecent] = useState(() => loadIds('shop.recent').slice(0, 6));
  useEffect(() => writeStored('shop.wishlist', wishlist), [wishlist]);
  useEffect(() => writeStored('shop.recent', recent), [recent]);
  const toggleWishlist = useCallback((id: number) => {
    if (!products.some((p) => p.id === id)) return;
    setWishlist((prev) => prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]);
  }, []);
  const recordView = useCallback((id: number) => {
    if (!products.some((p) => p.id === id)) return;
    setRecent((prev) => [id, ...prev.filter((value) => value !== id)].slice(0, 6));
  }, []);

  return (
    <ShoppingContext.Provider value={{ wishlist, recent, toggleWishlist, recordView }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
