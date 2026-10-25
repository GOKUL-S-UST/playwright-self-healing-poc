import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Product, products } from '../data';
import { stockLimit, useCart } from '../cart';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { useToast } from '../components/Toast';
import { useShopping } from '../shopping';
import WishlistToggle from '../components/WishlistToggle';
import RecentlyViewed from '../components/RecentlyViewed';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  if (!product) return <p role="status">Product not found</p>;
  return <ProductInfo key={product.id} product={product} />;
}

function ProductInfo({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { add, items } = useCart();
  const { showToast } = useToast();
  const { recordView } = useShopping();
  const [qty, setQty] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const stock = stockLimit(product);
  const available = stock - (items.find((line) => line.product.id === product.id)?.qty ?? 0);
  const quantity = Math.min(qty, Math.max(1, available));
  const images = [
    product.image ?? `https://picsum.photos/seed/product-${product.id}/600/400`,
    ...[2, 3].map((n) => `https://picsum.photos/seed/product-${product.id}-view-${n}/600/400`),
  ];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  useEffect(() => recordView(product.id), [product.id, recordView]);
  return (
    <>
    <article className="card product-detail">
      <div>
        <img className="detail-image" src={images[imageIndex]} alt={`${product.name}, view ${imageIndex + 1}`} />
        <div className="gallery-thumbs" role="group" aria-label="Product image gallery">
          {images.map((image, index) => (
            <button type="button" key={image} data-testid={`gallery-thumb-${index + 1}`}
              aria-label={`Show ${product.name} image ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="detail-info">
        <Link className="text-link" data-testid="back-to-products" to="/products">&larr; Back to all products</Link>
        {product.category && <Badge>{product.category}</Badge>}
        <h1 data-testid="product-name">{product.name}</h1>
        {product.rating !== undefined && <Rating value={product.rating} />}
        <p className="detail-description">{product.description}</p>
        <p className="detail-price" data-testid="product-price">${product.price}</p>
        <p className="detail-stock" data-testid="stock-status">{stock === 0 ? 'Out of stock' : stock <= 3 ? 'Low stock' : 'In stock'}{stock > 0 && ` · ${stock} available`}</p>
        {product.tags && <div className="detail-actions" aria-label="Product features">{product.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>}
        <div className="detail-actions">
          <label className="form-field">Quantity
            <input className="detail-qty" data-testid="detail-qty" type="number" min="1" max={Math.max(1, available)}
              value={quantity} disabled={available <= 0} onChange={(event) => setQty(Math.max(1, Math.min(Math.floor(event.target.valueAsNumber) || 1, Math.max(1, available))))} />
          </label>
          <Button
            data-testid="add-product-to-cart"
            disabled={available <= 0}
            onClick={() => {
              add(product, quantity);
              showToast('Added to cart');
              navigate('/products');
            }}
          >
            Add to cart
          </Button>
          <WishlistToggle product={product} />
        </div>
      </div>
    </article>
    {related.length > 0 && (
      <section className="product-strip" data-testid="related-products" aria-label="Related products">
        <h2>You might also like</h2>
        <div className="catalog-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    )}
    <RecentlyViewed excludeId={product.id} />
    </>
  );
}
