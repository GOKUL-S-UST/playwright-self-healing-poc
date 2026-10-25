import { Product } from '../data';
import { useShopping } from '../shopping';
import Button from './Button';

export default function WishlistToggle({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useShopping();
  const saved = wishlist.includes(product.id);
  return (
    <Button
      type="button"
      variant="secondary"
      data-testid={`wishlist-toggle-${product.id}`}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} wishlist`}
      onClick={() => toggleWishlist(product.id)}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span> {saved ? 'Saved' : 'Save'}
    </Button>
  );
}
