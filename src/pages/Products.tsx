import { Link } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../cart';
import Badge from '../components/Badge';
import Rating from '../components/Rating';

export default function Products() {
  const { items } = useCart();
  return (
    <section aria-labelledby="catalog-title">
      <div className="page-intro">
        <Badge>Everyday workspace</Badge>
        <h1 id="catalog-title">Make room for better work.</h1>
        <p>Thoughtful tools and small comforts for the way you work.</p>
      </div>
      <div className="catalog-toolbar">
        <h2>Shop essentials</h2>
        <p>{products.length} carefully chosen pieces</p>
      </div>
      <div className="catalog-grid">
        {products.map((p) => (
          <article key={p.id} data-testid={`product-${p.id}`} className="product-card">
            {p.image && <img className="product-image" src={p.image} alt={p.name} loading="lazy" />}
            <div className="product-card-content">
              {p.category && <Badge>{p.category}</Badge>}
              <h2>{p.name}</h2>
              {p.rating !== undefined && <Rating value={p.rating} />}
              <div className="product-card-footer">
                <span className="price">${p.price}</span>
                <Link className="text-link" data-testid={`view-product-${p.id}`} to={`/products/${p.id}`}>View details <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="catalog-cart-link">
        <Link className="button button-secondary" data-testid="go-checkout" to="/checkout">View cart ({items.length})</Link>
      </div>
    </section>
  );
}
