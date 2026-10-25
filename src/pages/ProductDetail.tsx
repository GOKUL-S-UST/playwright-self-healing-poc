import { Link, useNavigate, useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../cart';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { useToast } from '../components/Toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { showToast } = useToast();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p role="status">Product not found</p>;

  return (
    <article className="card product-detail">
      {product.image && <img className="detail-image" src={product.image} alt={product.name} />}
      <div className="detail-info">
        <Link className="text-link" data-testid="back-to-products" to="/products">&larr; Back to all products</Link>
        {product.category && <Badge>{product.category}</Badge>}
        <h1 data-testid="product-name">{product.name}</h1>
        {product.rating !== undefined && <Rating value={product.rating} />}
        <p className="detail-description">{product.description}</p>
        <p className="detail-price" data-testid="product-price">${product.price}</p>
        {product.stock !== undefined && <p className="detail-stock">{product.stock} in stock</p>}
        {product.tags && <div className="detail-actions" aria-label="Product features">{product.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>}
        <div className="detail-actions">
          <Button
            data-testid="add-product-to-cart"
            onClick={() => {
              add(product);
              showToast('Added to cart');
              navigate('/products');
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
