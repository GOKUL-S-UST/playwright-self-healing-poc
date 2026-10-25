import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import Button from './Button';
import CartLines from './CartLines';

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { subtotal } = useCart();
  useEffect(() => {
    const element = dialog.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="cart-drawer"
      data-testid="cart-drawer"
      aria-labelledby="drawer-title"
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <div className="drawer-heading">
        <h2 id="drawer-title">Your cart</h2>
        <Button type="button" variant="secondary" data-testid="close-cart-drawer" onClick={onClose} autoFocus>Close</Button>
      </div>
      <CartLines drawer />
      <p className="drawer-subtotal" data-testid="drawer-subtotal" aria-live="polite"><strong>Subtotal:</strong> ${subtotal}</p>
      <Link className="button button-primary" data-testid="drawer-checkout" to="/checkout" onClick={onClose}>Checkout</Link>
    </dialog>
  );
}
