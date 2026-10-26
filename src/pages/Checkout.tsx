import { useState } from 'react';
import { useCart } from '../cart';
import Button from '../components/Button';
import CartLines from '../components/CartLines';

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 10;

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="card order-confirmation">
        <span className="confirmation-mark" aria-hidden="true">✓</span>
        <h1 data-testid="order-confirmation">Order placed successfully!</h1>
        <p>Thank you for shopping with Studio Supply.</p>
      </section>
    );
  }

  return (
    <section className="card checkout-card" aria-labelledby="checkout-title">
      <div>
        <h1 id="checkout-title">Your cart</h1>
        <p className="detail-description">Review your items before placing your order.</p>
      </div>
      <CartLines />
      <div className="checkout-totals" aria-live="polite">
        <p data-testid="subtotal"><span>Subtotal:</span>{' '}<span>${subtotal}</span></p>
        <p data-testid="shipping"><span>Shipping:</span>{' '}<span>${shipping}</span></p>
        <p className="total-row" data-testid="total"><span>Total:</span>{' '}<span>${total}</span></p>
      </div>
      <Button
        data-testid="place-order"
        disabled={items.length === 0}
        className="checkout-submit"
        onClick={() => {
          clear();
          setPlaced(true);
        }}
      >
        Place order
      </Button>
    </section>
  );
}
