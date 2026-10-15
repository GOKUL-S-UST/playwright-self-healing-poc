import { Link } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../cart';

export default function Products() {
  const { items } = useCart();
  return (
    <div>
      <h1>Products</h1>
      <Link data-testid="go-checkout" to="/checkout">Cart ({items.length})</Link>
      <ul className="list">
        {products.map((p) => (
          <li key={p.id} data-testid={`product-${p.id}`} className="card">
            <strong>{p.name}</strong> - ${p.price}
            <div>
              <Link data-testid={`view-product-${p.id}`} to={`/products/${p.id}`}>View details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
