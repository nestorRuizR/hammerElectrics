export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.search)   params.set('search',   filters.search)
  if (filters.featured) params.set('featured',  '1')
  const res = await fetch(`${API_BASE}/api/products?${params}`)
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`)
  if (!res.ok) throw new Error('Producto no encontrado')
  return res.json()
}

export async function createProduct(formData) {
  const res = await fetch(`${API_BASE}/api/products`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Error al crear producto')
  return res.json()
}

export async function updateProduct(id, formData) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'PUT', body: formData })
  if (!res.ok) throw new Error('Error al actualizar producto')
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar producto')
  return res.json()
}
