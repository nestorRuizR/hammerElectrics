import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../services/products'
import { fetchProducts, deleteProduct, toggleProduct } from '../../services/api'
import './AdminPage.css'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchProducts({ adminMode: true })
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }

  useEffect(load, [])

  const handleToggle = async (product) => {
    const next = !product.enabled
    try {
      await toggleProduct(product.id, next)
      setProducts(ps => ps.map(p => p.id === product.id ? { ...p, enabled: next } : p))
    } catch (err) {
      alert('Error al cambiar estado: ' + err.message)
    }
  }

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteProduct(product.id, product.image)
      setProducts(ps => ps.filter(p => p.id !== product.id))
    } catch (err) {
      alert('Error al eliminar: ' + err.message)
    }
  }

  const active   = products.filter(p => p.enabled).length
  const inactive = products.length - active

  return (
    <div className="admin">

      <div className="admin__header">
        <div>
          <h1 className="admin__title">Panel de administración</h1>
          <p className="admin__subtitle">
            {active} activo{active !== 1 ? 's' : ''}
            {inactive > 0 && <span className="admin__subtitle-inactive"> · {inactive} inhabilitado{inactive !== 1 ? 's' : ''}</span>}
          </p>
        </div>
        <Link to="/admin/nuevo" className="admin__new-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo producto
        </Link>
      </div>

      {error && (
        <div className="admin__error">
          ⚠ {error} — Verifica las variables de entorno de Supabase. <button onClick={load}>Reintentar</button>
        </div>
      )}

      {loading ? (
        <div className="admin__table-wrap">
          {[...Array(5)].map((_, i) => <div key={i} className="admin__skeleton" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="admin__empty">
          <p>No hay productos. <Link to="/admin/nuevo">Crea el primero</Link>.</p>
        </div>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const cat = CATEGORIES.find(c => c.id === p.category)
                return (
                  <tr key={p.id} className={!p.enabled ? 'admin__row--disabled' : ''}>
                    <td>
                      <div className="admin__thumb">
                        {p.image
                          ? <img src={p.image} alt={p.name} />
                          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                        }
                      </div>
                    </td>
                    <td className="admin__name">
                      {p.name}
                      {p.featured && <span className="admin__featured-dot" title="Destacado">⭐</span>}
                    </td>
                    <td>
                      <span className="admin__cat-badge">{cat?.icon} {cat?.label}</span>
                    </td>
                    <td className="admin__price">S/ {p.price.toFixed(2)}</td>
                    <td>
                      <span className={`admin__stock ${p.stock <= 5 ? 'low' : ''}`}>{p.stock}</span>
                    </td>
                    <td>
                      {p.enabled
                        ? <span className="admin__status admin__status--on">Activo</span>
                        : <span className="admin__status admin__status--off">Inactivo</span>
                      }
                    </td>
                    <td>
                      <div className="admin__actions">
                        <Link to={`/admin/${p.id}/editar`} className="admin__edit-btn">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Editar
                        </Link>
                        <button
                          className={`admin__toggle-btn ${p.enabled ? 'admin__toggle-btn--off' : 'admin__toggle-btn--on'}`}
                          onClick={() => handleToggle(p)}
                          title={p.enabled ? 'Inhabilitar producto' : 'Habilitar producto'}
                        >
                          {p.enabled
                            ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> Inhabilitar</>
                            : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Habilitar</>
                          }
                        </button>
                        <button className="admin__delete-btn" onClick={() => handleDelete(p)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
