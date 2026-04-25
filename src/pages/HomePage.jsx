import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CATEGORIES } from '../services/products'
import { useProducts } from '../hooks/useProducts'
import { useToast } from '../context/ToastContext'
import './HomePage.css'

const FEATURED_FILTER = { featured: true }

export default function HomePage() {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { products: featuredProducts, loading } = useProducts(FEATURED_FILTER)

  return (
    <div className="home">

      {/* BANNER HERO */}
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__hero-tag">⚡ Especialistas en tableros</p>
          <h1 className="home__hero-title">Tableros y materiales eléctricos</h1>
          <p className="home__hero-desc">Termomagnéticas, diferenciales, cables y más — distribución en Lima.</p>
          <button className="home__hero-btn" onClick={() => navigate('/productos')}>
            Ver catálogo completo
          </button>
        </div>
        <div className="home__hero-badge">
          <span className="home__hero-badge-pct">30%</span>
          <span className="home__hero-badge-off">OFF</span>
        </div>
      </section>

      {/* BANNER ENVÍO */}
      <div className="home__shipping">
        <div className="home__shipping-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          <span>Envío gratis desde S/ 200</span>
        </div>
        <div className="home__shipping-sep" />
        <div className="home__shipping-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Productos garantizados</span>
        </div>
        <div className="home__shipping-sep" />
        <div className="home__shipping-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Atención 9am – 6pm</span>
        </div>
      </div>

      {/* CATEGORÍAS */}
      <section className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Categorías</h2>
          <Link to="/productos" className="home__section-link">Ver todo</Link>
        </div>
        <div className="home__categories">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/productos?categoria=${cat.id}`} className="home__cat-card">
              <span className="home__cat-icon">{cat.icon}</span>
              <span className="home__cat-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">Destacados</h2>
          <Link to="/productos?categoria=ofertas" className="home__section-link">Ver todo</Link>
        </div>
        <div className="home__products">
          {loading
            ? [...Array(3)].map((_, i) => <div key={i} className="home__product-skeleton" />)
            : featuredProducts.map(product => (
              <div key={product.id} className="home__product-card">
                <Link to={`/productos/${product.id}`} className="home__product-img">
                  {product.image
                    ? <img src={product.image} alt={product.name} />
                    : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                  }
                </Link>
                <div className="home__product-info">
                  <span className="home__product-cat">
                    {CATEGORIES.find(c => c.id === product.category)?.label}
                  </span>
                  <Link to={`/productos/${product.id}`}>
                    <h3 className="home__product-name">{product.name}</h3>
                  </Link>
                  <div className="home__product-bottom">
                    <span className="home__product-price">S/ {product.price.toFixed(2)}</span>
                    <button
                      className="home__product-add"
                      onClick={() => { addItem(product); showToast(product.name) }}
                      aria-label="Agregar al carrito"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="home__cta">
        <div className="home__cta-content">
          <h3 className="home__cta-title">¿Necesitas asesoría técnica?</h3>
          <p className="home__cta-desc">Especialistas en tableros eléctricos, instalaciones y materiales para obras y proyectos en Lima.</p>
          <a href="https://wa.me/51922350829" className="home__cta-btn" target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

    </div>
  )
}
