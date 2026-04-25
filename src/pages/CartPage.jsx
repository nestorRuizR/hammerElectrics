import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

export default function CartPage() {
  const { items, total, updateQty, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart__empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos del catálogo para continuar.</p>
        <Link to="/productos" className="cart__empty-btn">Ver catálogo</Link>
      </div>
    )
  }

  const shipping   = total >= 150 ? 0 : 15
  const finalTotal = total + shipping

  const handleCheckout = () => {
    const lines = items
      .map(i => `• ${i.name} x${i.qty}  →  S/ ${(i.price * i.qty).toFixed(2)}`)
      .join('\n')
    const envio = shipping === 0 ? 'Gratis' : `S/ ${shipping.toFixed(2)}`
    const msg =
      `Hola, me gustaría realizar el siguiente pedido 🛒\n\n` +
      `${lines}\n\n` +
      `Envío: ${envio}\n` +
      `*Total: S/ ${finalTotal.toFixed(2)}*`
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="cart">

      <div className="cart__header">
        <h1 className="cart__title">Mi carrito</h1>
        <button className="cart__clear" onClick={clearCart}>Vaciar</button>
      </div>

      {/* Lista de ítems */}
      <div className="cart__items">
        {items.map(item => (
          <div key={item.id} className="cart__item">

            {/* Imagen */}
            <div className="cart__item-img">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>

            {/* Info */}
            <div className="cart__item-info">
              <Link to={`/productos/${item.id}`} className="cart__item-name">{item.name}</Link>
              <span className="cart__item-unit">S/ {item.price.toFixed(2)} c/u</span>
            </div>

            {/* Controles */}
            <div className="cart__item-right">
              <div className="cart__qty">
                <button
                  className="cart__qty-btn"
                  onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
                >−</button>
                <span className="cart__qty-val">{item.qty}</span>
                <button
                  className="cart__qty-btn"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                >+</button>
              </div>
              <span className="cart__item-subtotal">S/ {(item.price * item.qty).toFixed(2)}</span>
              <button className="cart__remove" onClick={() => removeItem(item.id)} aria-label="Eliminar">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Resumen de orden */}
      <div className="cart__summary">
        <h2 className="cart__summary-title">Resumen</h2>

        <div className="cart__summary-rows">
          <div className="cart__summary-row">
            <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} productos)</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Envío</span>
            <span className={shipping === 0 ? 'cart__free' : ''}>
              {shipping === 0 ? 'GRATIS' : `S/ ${shipping.toFixed(2)}`}
            </span>
          </div>
          {shipping > 0 && (
            <p className="cart__shipping-hint">
              Agrega S/ {(150 - total).toFixed(2)} más para envío gratis
            </p>
          )}
        </div>

        <div className="cart__summary-total">
          <span>Total</span>
          <span>S/ {finalTotal.toFixed(2)}</span>
        </div>

        <button className="cart__checkout" onClick={handleCheckout}>
          Proceder al pago
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <Link to="/productos" className="cart__continue">← Seguir comprando</Link>
      </div>

    </div>
  )
}
