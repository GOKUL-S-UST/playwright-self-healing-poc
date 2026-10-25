import { stockLimit, useCart } from '../cart';
import Button from './Button';
import EmptyState from './EmptyState';

export default function CartLines({ drawer = false }: { drawer?: boolean }) {
  const { items, increment, decrement, remove } = useCart();
  const prefix = drawer ? 'drawer-' : '';
  if (!items.length) {
    return <EmptyState title="Your cart is empty">Explore the catalog to find something for your workspace.</EmptyState>;
  }
  return (
    <ul className="checkout-list">
      {items.map(({ product, qty }) => (
        <li key={product.id} data-testid={drawer ? 'drawer-cart-item' : 'cart-item'}>
          <div className="cart-line">
            <strong>{product.name}</strong>
            <span>${product.price} each · Quantity: {qty}</span>
            <div className="quantity-controls" role="group" aria-label={`Quantity for ${product.name}`}>
              <Button type="button" variant="secondary" data-testid={`${prefix}qty-decrease-${product.id}`}
                aria-label={`Decrease ${product.name} quantity`} disabled={qty <= 1} onClick={() => decrement(product.id)}>−</Button>
              <output data-testid={`${prefix}qty-value-${product.id}`} aria-live="polite" aria-label={`${product.name} quantity`}>{qty}</output>
              <Button type="button" variant="secondary" data-testid={`${prefix}qty-increase-${product.id}`}
                aria-label={`Increase ${product.name} quantity`} disabled={qty >= stockLimit(product)} onClick={() => increment(product.id)}>+</Button>
              <Button type="button" variant="secondary" data-testid={`${prefix}remove-item-${product.id}`}
                aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)}>Remove</Button>
            </div>
          </div>
          <strong>${product.price * qty}</strong>
        </li>
      ))}
    </ul>
  );
}
