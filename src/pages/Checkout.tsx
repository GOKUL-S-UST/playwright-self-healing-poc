import { useState } from 'react';
import { useCart } from '../cart';

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 10;

export default function Checkout() {
  const { items, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const subtotal = items.reduce((sum, p) => sum + p.price, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (placed) {
    return <h1 data-testid="order-confirmation">Order placed successfully!</h1>;
  }

  return (
    <div className="card">
      <h1>Checkout</h1>
      <ul>
        {items.map((p, i) => (
          <li key={i} data-testid="cart-item">{p.name} - ${p.price}</li>
        ))}
      </ul>
      <p data-testid="subtotal">Subtotal: ${subtotal}</p>
      <p data-testid="shipping">Shipping: ${shipping}</p>
      <p data-testid="total">Total: ${total}</p>
      <button
        data-testid="place-order"
        disabled={items.length === 0}
        onClick={() => {
          clear();
          setPlaced(true);
        }}
      >
        Place order
      </button>
    </div>
  );
}
