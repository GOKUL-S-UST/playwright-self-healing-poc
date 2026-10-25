import { products } from '../data';
import { stockLimit, useCart } from '../cart';
import { useShopping } from '../shopping';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import { useToast } from '../components/Toast';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useShopping();
  const { items, add } = useCart();
  const { showToast } = useToast();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return (
    <section data-testid="wishlist-page" aria-labelledby="wishlist-title">
      <div className="page-intro">
        <h1 id="wishlist-title">Your wishlist</h1>
        <p>Keep your favorite workspace essentials close at hand.</p>
      </div>
      {!saved.length ? <EmptyState title="Your wishlist is empty">Save products using the heart button while browsing.</EmptyState> : (
        <div className="catalog-grid">
          {saved.map((product) => {
            const quantity = items.find((line) => line.product.id === product.id)?.qty ?? 0;
            return (
              <div className="wishlist-item" key={product.id}>
                <ProductCard product={product} />
                <Button type="button" data-testid={`wishlist-move-${product.id}`} disabled={quantity >= stockLimit(product)} onClick={() => {
                  add(product);
                  toggleWishlist(product.id);
                  showToast(`${product.name} moved to cart`);
                }}>Move to cart</Button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
