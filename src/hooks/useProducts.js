import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProducts(filters)
      .then(data => { setProducts(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [filters.category, filters.search, filters.featured])

  return { products, loading, error }
}
