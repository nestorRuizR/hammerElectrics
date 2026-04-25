export const CATEGORIES = [
  { id: 'herramientas', label: 'Herramientas', icon: '🔧' },
  { id: 'electricidad', label: 'Electricidad', icon: '⚡' },
  { id: 'plomeria',     label: 'Plomería',     icon: '🚿' },
  { id: 'pintura',      label: 'Pintura',      icon: '🎨' },
  { id: 'fijacion',     label: 'Fijación',     icon: '🔩' },
  { id: 'seguridad',    label: 'Seguridad',    icon: '🔒' },
]

export const PRODUCTS = [
  { id: 1, name: 'Taladro Percutor 750W',      price: 189.90, category: 'herramientas', image: null, stock: 12,  featured: true },
  { id: 2, name: 'Juego de Llaves Allen',       price: 24.50,  category: 'herramientas', image: null, stock: 30,  featured: false },
  { id: 3, name: 'Cable THW 14AWG (m)',         price: 2.80,   category: 'electricidad', image: null, stock: 500, featured: false },
  { id: 4, name: 'Interruptor Termomagnético',  price: 45.00,  category: 'electricidad', image: null, stock: 20,  featured: true },
  { id: 5, name: 'Tubo PVC 2" x 3m',           price: 12.50,  category: 'plomeria',     image: null, stock: 80,  featured: false },
  { id: 6, name: 'Pintura Látex Blanco 4L',    price: 68.00,  category: 'pintura',      image: null, stock: 15,  featured: true },
]

export const getProducts    = (f = {}) => {
  let r = [...PRODUCTS]
  if (f.category) r = r.filter(p => p.category === f.category)
  if (f.search)   r = r.filter(p => p.name.toLowerCase().includes(f.search.toLowerCase()))
  if (f.featured) r = r.filter(p => p.featured)
  return r
}
export const getProductById = (id) => PRODUCTS.find(p => p.id === Number(id))
