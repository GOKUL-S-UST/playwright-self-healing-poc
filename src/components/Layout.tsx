import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../cart';
import { useTheme } from '../theme';

export default function Layout({ children }: { children: ReactNode }) {
  const { items } = useCart();
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
              <Link className="cart-link" data-testid="header-cart-link" to="/checkout" aria-label={`View cart, ${items.length} items`}>
                <span aria-hidden="true">▱</span>
                <span>Cart</span>
                <span className="cart-count" data-testid="header-cart-count">{items.length}</span>
              </Link>
            </div>
          </nav>
        </header>
      )}
      <main className="page-container">{children}</main>
      <footer className="site-footer">
        <p>Thoughtful essentials for your everyday workspace.</p>
      </footer>
    </div>
  );
}
