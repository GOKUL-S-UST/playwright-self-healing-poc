import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../cart';
import { useTheme } from '../theme';
import { useShopping } from '../shopping';
import CartDrawer from './CartDrawer';

export default function Layout({ children }: { children: ReactNode }) {
  const { count } = useCart();
  const { wishlist } = useShopping();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLogin = useLocation().pathname === '/login';

  return (
    <div className="site-shell">
      {!isLogin && (
        <header className="site-header">
          <nav className="header-inner" aria-label="Main navigation">
            <Link className="brand" data-testid="brand-link" to="/products">
              <span className="brand-mark" aria-hidden="true">S</span>
              <span>Studio Supply</span>
            </Link>
            <div className="header-actions">
              <button
                className="theme-toggle"
                type="button"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                aria-pressed={theme === 'dark'}
                data-testid="theme-toggle"
                onClick={toggleTheme}
              >
                <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
                <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'} mode</span>
              </button>
              <Link className="cart-link" data-testid="header-wishlist-link" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}>
                <span aria-hidden="true">♡</span>
                <span className="cart-count" data-testid="header-wishlist-count">{wishlist.length}</span>
              </Link>
              <Link className="cart-link" data-testid="header-cart-link" to="/checkout" aria-label={`View cart, ${count} items`}>
                <span aria-hidden="true">▱</span>
                <span>Cart</span>
                <span className="cart-count" data-testid="header-cart-count">{count}</span>
              </Link>
              <button className="theme-toggle" type="button" data-testid="open-cart-drawer" aria-label="Open cart drawer"
                aria-haspopup="dialog" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>Preview</button>
            </div>
          </nav>
        </header>
      )}
      <main className="page-container">{children}</main>
      <footer className="site-footer">
        <p>Thoughtful essentials for your everyday workspace.</p>
      </footer>
      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
