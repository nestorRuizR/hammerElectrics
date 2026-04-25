import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../services/products'
import { fetchProducts, deleteProduct } from '../../services/api'
import './AdminPage.css'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const load = () => {
    setLoading(true)
    fetchProducts()
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }

  useEffect(load, [])

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteProduct(product.id, product.image)
      setProducts(ps => ps.filter(p => p.id !== product.id))
    } catch (err) {
      alert('Error al eliminar: ' + err.message)
    }
  }

  return (
    <div className="admin">

      <div className="admin__header">
        <div>
          <h1 className="admin__title">Panel de administración</h1>
          <p className="admin__subtitle">{products.length} producto{products.length !== 1 ? 's' : ''} en el catálogo</p>
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
                <th>Destacado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const cat = CATEGORIES.find(c => c.id === p.category)
                return (
                  <tr key={p.id}>
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
                    <td className="admin__name">{p.name}</td>
                    <td>
                      <span className="admin__cat-badge">{cat?.icon} {cat?.label}</span>
                    </td>
                    <td className="admin__price">S/ {p.price.toFixed(2)}</td>
                    <td>
                      <span className={`admin__stock ${p.stock <= 5 ? 'low' : ''}`}>{p.stock}</span>
                    </td>
                    <td>
                      {p.featured
                        ? <span className="admin__featured-badge">⭐ Sí</span>
                        : <span className="admin__no-badge">—</span>
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
