import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../services/products'
import { fetchProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, items } = useCart()
  const { showToast } = useToast()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty]         = useState(1)
  const [added, setAdded]     = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="detail__loading">
        <div className="detail__loading-img" />
        <div className="detail__loading-info">
          <div className="detail__loading-bar" style={{ width: '60%' }} />
          <div className="detail__loading-bar" style={{ width: '40%', height: 32 }} />
          <div className="detail__loading-bar" style={{ width: '80%' }} />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="detail__notfound">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>Producto no encontrado.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    )
  }

  const category = CATEGORIES.find(c => c.id === product.category)
  const inCart   = items.find(i => i.id === product.id)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    showToast(product.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="detail">

      {/* Breadcrumb */}
      <nav className="detail__breadcrumb">
        <button className="detail__back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver
        </button>
        <div className="detail__bc-path">
          <Link to="/productos" className="detail__bc-link">Catálogo</Link>
          <span className="detail__bc-sep">/</span>
          <span className="detail__bc-cur">{product.name}</span>
        </div>
      </nav>

      {/* Imagen */}
      <div className="detail__image">
        {product.image
          ? <img src={product.image} alt={product.name} />
          : <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#c9cdd4" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
        }
      </div>

      {/* Información */}
      <div className="detail__info">

        <div className="detail__badges">
          <span className="detail__cat-badge">{category?.icon} {category?.label}</span>
          <span className={`detail__stock ${product.stock <= 5 ? 'low' : ''}`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
          </span>
        </div>

        <h1 className="detail__name">{product.name}</h1>
        {product.description && (
          <p className="detail__description">{product.description}</p>
        )}
        <p className="detail__price">S/ {product.price.toFixed(2)}</p>

        {/* Selector de cantidad */}
        <div className="detail__qty-row">
          <span className="detail__qty-label">Cantidad</span>
          <div className="detail__qty-ctrl">
            <button
              className="detail__qty-btn"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >−</button>
            <span className="detail__qty-val">{qty}</span>
            <button
              className="detail__qty-btn"
              onClick={() => setQty(q => Math.min(product.stock, q + 1))}
              disabled={qty >= product.stock}
            >+</button>
          </div>
        </div>

        {/* Acciones */}
        <div className="detail__actions">
          <button
            className={`detail__add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {added
              ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Agregado</>
              : 'Agregar al carrito'
            }
          </button>
          {inCart && (
            <Link to="/carrito" className="detail__cart-link">
              Ver carrito · {inCart.qty} {inCart.qty === 1 ? 'unidad' : 'unidades'}
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
