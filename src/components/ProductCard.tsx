import { Link } from 'react-router-dom';
import { Product } from '../data';
import { stockLimit, useCart } from '../cart';
import Badge from './Badge';
import Button from './Button';
import Rating from './Rating';
import WishlistToggle from './WishlistToggle';
import { useToast } from './Toast';

export default function ProductCard({ product: p }: { product: Product }) {
  const { items, add } = useCart();
  const { showToast } = useToast();
  const available = stockLimit(p) - (items.find((line) => line.product.id === p.id)?.qty ?? 0);
  return (
    <article data-testid={`product-${p.id}`} className="product-card">
      {p.image && <img className="product-image" src={p.image} alt={p.name} loading="lazy" />}
      <div className="product-card-content">
        {p.category && <Badge>{p.category}</Badge>}
        <h2>{p.name}</h2>
        {p.rating !== undefined && <Rating value={p.rating} />}
        <div className="product-card-footer">
          <span className="price">${p.price}</span>
          <Link className="text-link" data-testid={`view-product-${p.id}`} to={`/products/${p.id}`}>View details <span aria-hidden="true">→</span></Link>
        </div>
        <div className="detail-actions">
          <Button
            type="button"
            data-testid={`quick-add-${p.id}`}
            disabled={available <= 0}
            onClick={() => {
              add(p);
              showToast(`${p.name} added to cart`);
            }}
          >
            {stockLimit(p) === 0 ? 'Out of stock' : available <= 0 ? 'Stock limit reached' : 'Quick add'}
          </Button>
          <WishlistToggle product={p} />
        </div>
      </div>
    </article>
  );
}
