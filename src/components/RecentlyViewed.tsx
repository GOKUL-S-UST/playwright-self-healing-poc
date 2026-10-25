import { Link } from 'react-router-dom';
import { products } from '../data';
import { useShopping } from '../shopping';

export default function RecentlyViewed({ excludeId }: { excludeId?: number }) {
  const { recent } = useShopping();
  const viewed = recent.filter((id) => id !== excludeId).flatMap((id) => {
    const product = products.find((p) => p.id === id);
    return product ? [product] : [];
  });
  if (!viewed.length) return null;
  return (
    <section className="product-strip" data-testid="recently-viewed" aria-label="Recently viewed products">
      <h2>Recently viewed</h2>
      <div className="recent-grid">
        {viewed.map((product) => (
          <Link className="recent-product" key={product.id} data-testid={`recent-product-${product.id}`} to={`/products/${product.id}`}>
            {product.image && <img src={product.image} alt="" loading="lazy" />}
            <span>{product.name}</span>
            <strong>${product.price}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
