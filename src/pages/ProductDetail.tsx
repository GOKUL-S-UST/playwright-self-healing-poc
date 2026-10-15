import { Link, useNavigate, useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../cart';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="card">
      <Link to="/products">&larr; Back</Link>
      <h1 data-testid="product-name">{product.name}</h1>
      <p>{product.description}</p>
      <p data-testid="product-price">${product.price}</p>
      <button
        data-testid="add-to-cart"
        onClick={() => {
          add(product);
          navigate('/products');
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
