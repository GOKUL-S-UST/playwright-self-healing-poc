import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../cart';
import Badge from '../components/Badge';
import ProductCard from '../components/ProductCard';
import RecentlyViewed from '../components/RecentlyViewed';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

const categories = [...new Set(products.map((product) => product.category).filter(Boolean))];
const filterKeys = ['q', 'cat', 'min', 'max', 'sort'];

function priceBound(value: string | null, fallback: number) {
  return value?.trim() && Number.isFinite(Number(value)) ? Number(value) : fallback;
}

export default function Products() {
  const { count } = useCart();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('cat') ?? '';
  const sort = params.get('sort') ?? 'featured';
  const update = (key: string, value: string) => setParams((prev) => {
    const next = new URLSearchParams(prev);
    if (value) next.set(key, value);
    else next.delete(key);
    return next;
  }, { replace: true });
  const filtered = products.filter((product) => {
    const searchable = [product.name, ...(product.tags ?? [])].join(' ').toLowerCase();
    return searchable.includes(query.trim().toLowerCase())
      && (!category || product.category === category)
      && product.price >= priceBound(params.get('min'), -Infinity)
      && product.price <= priceBound(params.get('max'), Infinity);
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
    return 0;
  });

  return (
    <section aria-labelledby="catalog-title">
      <div className="page-intro">
        <Badge>Everyday workspace</Badge>
        <h1 id="catalog-title">Make room for better work.</h1>
        <p>Thoughtful tools and small comforts for the way you work.</p>
      </div>
      <div className="catalog-toolbar">
        <h2>Shop essentials</h2>
        <p data-testid="result-count" role="status">{filtered.length} results</p>
      </div>
      <div className="catalog-filters" role="search" aria-label="Filter products">
        <label className="form-field">Search name or tags
          <input type="search" data-testid="search-input" value={query} onChange={(event) => update('q', event.target.value)} placeholder="Try ergonomic or wireless" />
        </label>
        <label className="form-field">Category
          <select data-testid="category-filter" value={category} onChange={(event) => update('cat', event.target.value)}>
            <option value="">All categories</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="form-field">Minimum price
          <input type="number" min="0" data-testid="price-min" value={params.get('min') ?? ''} onChange={(event) => update('min', event.target.value)} />
        </label>
        <label className="form-field">Maximum price
          <input type="number" min="0" data-testid="price-max" value={params.get('max') ?? ''} onChange={(event) => update('max', event.target.value)} />
        </label>
        <label className="form-field">Sort by
          <select data-testid="sort-select" value={sort} onChange={(event) => update('sort', event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
        <Button type="button" variant="secondary" data-testid="clear-filters" onClick={() => setParams((prev) => {
          const next = new URLSearchParams(prev);
          filterKeys.forEach((key) => next.delete(key));
          return next;
        }, { replace: true })}>Clear filters</Button>
      </div>
      {filtered.length ? (
        <div className="catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <EmptyState title="No products found">Try another search or clear your filters.</EmptyState>
      )}
      <div className="catalog-cart-link">
        <Link className="button button-secondary" data-testid="go-checkout" to="/checkout">View cart ({count})</Link>
      </div>
      <RecentlyViewed />
    </section>
  );
}
