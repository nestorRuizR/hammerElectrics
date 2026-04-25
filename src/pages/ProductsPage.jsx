import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CATEGORIES } from '../services/products'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import './ProductsPage.css'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category  = searchParams.get('categoria') || ''
  const search    = searchParams.get('buscar')    || ''
  const isOfertas = category === 'ofertas'

  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => { setLocalSearch(search) }, [search])

  const filters = isOfertas
    ? { featured: true }
    : { category, search }

  const { products, loading } = useProducts(filters)
  const { addItem } = useCart()
  const { showToast } = useToast()

  const setCategory = (cat) => {
    const next = new URLSearchParams(searchParams)
    if (cat) next.set('categoria', cat)
    else     next.delete('categoria')
    setSearchParams(next)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (localSearch.trim()) next.set('buscar', localSearch.trim())
    else                    next.delete('buscar')
    setSearchParams(next)
  }

  const clearSearch = () => {
    setLocalSearch('')
    const next = new URLSearchParams(searchParams)
    next.delete('buscar')
    setSearchParams(next)
  }

  return (
    <div className="products">

      {/* Barra de búsqueda */}
      <div className="products__search-bar">
        <form onSubmit={handleSearch} className="products__search-form">
          <svg className="products__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en catálogo..."
            className="products__search-input"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button type="button" className="products__search-clear" onClick={clearSearch}>✕</button>
          )}
        </form>
      </div>

      {/* Filtros de categoría */}
      <div className="products__filters">
        <button
          className={`products__chip ${!category && !isOfertas ? 'active' : ''}`}
          onClick={() => setCategory('')}
        >Todos</button>
        <button
          className={`products__chip ${isOfertas ? 'active' : ''}`}
          onClick={() => setCategory('ofertas')}
        >⭐ Destacados</button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`products__chip ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >{cat.icon} {cat.label}</button>
        ))}
      </div>

      {/* Info resultados */}
      {(search || isOfertas) && !loading && (
        <p className="products__results-info">
          {isOfertas
            ? `${products.length} producto${products.length !== 1 ? 's' : ''} destacado${products.length !== 1 ? 's' : ''}`
            : `${products.length} resultado${products.length !== 1 ? 's' : ''} para "${search}"`}
        </p>
      )}

      {/* Estados: cargando / vacío / grid */}
      {loading ? (
        <div className="products__grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="products__skeleton" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="products__empty">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <p>No se encontraron productos.</p>
          <button onClick={() => { setSearchParams({}); setLocalSearch('') }}>
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="products__grid">
          {products.map(product => (
            <div key={product.id} className="products__card">
              <Link to={`/productos/${product.id}`} className="products__card-img">
                {product.image
                  ? <img src={product.image} alt={product.name} />
                  : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                }
              </Link>
              <div className="products__card-info">
                <span className="products__card-cat">
                  {CATEGORIES.find(c => c.id === product.category)?.label}
                </span>
                <Link to={`/productos/${product.id}`}>
                  <h3 className="products__card-name">{product.name}</h3>
                </Link>
                <div className="products__card-bottom">
                  <span className="products__card-price">S/ {product.price.toFixed(2)}</span>
                  <button
                    className="products__card-add"
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
          ))}
        </div>
      )}
    </div>
  )
}
