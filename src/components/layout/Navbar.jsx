import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/images/logo-hammer.png'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="navbar">

      {/* Barra principal */}
      <div className="navbar__main">

        <Link to="/" className="navbar__logo">
          <img src={logo} alt="Hammer Electrics" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">HAMMER</span>
            <span className="navbar__logo-sub">ELECTRICS</span>
          </div>
        </Link>

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <Link to="/carrito" className="navbar__icon-btn" aria-label="Carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <span className="navbar__badge">{count > 99 ? '99+' : count}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Búsqueda desplegable */}
      {searchOpen && (
        <div className="navbar__search">
          <form onSubmit={handleSearch} className="navbar__search-form">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
              autoFocus
            />
            <button type="submit" className="navbar__search-btn">Buscar</button>
            <button
              type="button"
              className="navbar__search-cancel"
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
            >✕</button>
          </form>
        </div>
      )}

      {/* Nav inferior mobile */}
      <nav className="navbar__bottom">
        <Link to="/" className="navbar__nav-item">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Inicio</span>
        </Link>

        <Link to="/productos" className="navbar__nav-item">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>Catálogo</span>
        </Link>

        <Link to="/carrito" className="navbar__nav-item navbar__nav-cart-item">
          <div className="navbar__nav-cart-bubble">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && <span className="navbar__nav-badge">{count}</span>}
          </div>
          <span>Carrito</span>
        </Link>

        <Link to="/productos?categoria=ofertas" className="navbar__nav-item">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>Ofertas</span>
        </Link>
      </nav>
    </header>
  )
}
