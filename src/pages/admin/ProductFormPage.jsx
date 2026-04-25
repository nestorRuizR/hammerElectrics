import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CATEGORIES } from '../../services/products'
import { fetchProductById, createProduct, updateProduct } from '../../services/api'
import './ProductFormPage.css'

const EMPTY_FORM = { name: '', price: '', category: 'tableros', stock: '', featured: false, description: '' }

export default function ProductFormPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const isEdit   = Boolean(id)

  const [form, setForm]           = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview]     = useState(null)   // object URL for new file
  const [existing, setExisting]   = useState(null)   // existing image path from DB
  const [loading, setLoading]     = useState(isEdit)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState(null)
  const fileInputRef              = useRef(null)

  useEffect(() => {
    if (!isEdit) return
    fetchProductById(id)
      .then(p => {
        setForm({
          name:        p.name,
          price:       p.price,
          category:    p.category,
          stock:       p.stock,
          featured:    p.featured,
          description: p.description || '',
        })
        setExisting(p.image)
        setLoading(false)
      })
      .catch(() => { setError('No se pudo cargar el producto.'); setLoading(false) })
  }, [id, isEdit])

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const handleField = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setExisting(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim())  return setError('El nombre es obligatorio.')
    if (!form.price)        return setError('El precio es obligatorio.')
    if (form.stock === '')  return setError('El stock es obligatorio.')
    setError(null)
    setSaving(true)

    const payload = {
      name:        form.name.trim(),
      price:       form.price,
      category:    form.category,
      stock:       form.stock,
      featured:    form.featured,
      description: form.description,
      imageFile:   imageFile || null,
    }

    try {
      if (isEdit) await updateProduct(id, { ...payload, existingImage: existing })
      else        await createProduct(payload)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const displayImage = preview || existing || null

  if (loading) {
    return (
      <div className="pform__loading">
        {[...Array(5)].map((_, i) => <div key={i} className="pform__loading-bar" />)}
      </div>
    )
  }

  return (
    <div className="pform">

      {/* Header */}
      <div className="pform__header">
        <Link to="/admin" className="pform__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver
        </Link>
        <h1 className="pform__title">
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="pform__form">

        {error && <div className="pform__error">⚠ {error}</div>}

        {/* Imagen */}
        <div className="pform__field">
          <label className="pform__label">Imagen del producto</label>
          <div className="pform__image-area">
            {displayImage ? (
              <div className="pform__image-preview">
                <img src={displayImage} alt="Vista previa" />
                <button type="button" className="pform__image-remove" onClick={removeImage}>✕</button>
              </div>
            ) : (
              <label className="pform__image-drop" htmlFor="imageInput">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Haz clic para subir</span>
                <span className="pform__image-hint">JPG, PNG, WebP · Máx. 5 MB</span>
              </label>
            )}
            <input
              id="imageInput"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="pform__image-input"
            />
          </div>
          {displayImage && !preview && (
            <label htmlFor="imageInput" className="pform__image-change">Cambiar imagen</label>
          )}
        </div>

        {/* Nombre */}
        <div className="pform__field">
          <label className="pform__label" htmlFor="name">Nombre <span className="pform__req">*</span></label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleField}
            placeholder="Ej: Taladro Percutor 750W"
            className="pform__input"
            maxLength={120}
          />
        </div>

        {/* Categoría y precio */}
        <div className="pform__row">
          <div className="pform__field">
            <label className="pform__label" htmlFor="category">Categoría <span className="pform__req">*</span></label>
            <select id="category" name="category" value={form.category} onChange={handleField} className="pform__select">
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
          <div className="pform__field">
            <label className="pform__label" htmlFor="price">Precio (S/) <span className="pform__req">*</span></label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleField}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="pform__input"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="pform__field pform__field--half">
          <label className="pform__label" htmlFor="stock">Stock <span className="pform__req">*</span></label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleField}
            placeholder="0"
            min="0"
            step="1"
            className="pform__input"
          />
        </div>

        {/* Descripción */}
        <div className="pform__field">
          <label className="pform__label" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleField}
            placeholder="Describe las características principales del producto..."
            className="pform__textarea"
            rows={3}
            maxLength={500}
          />
          <span className="pform__counter">{form.description.length}/500</span>
        </div>

        {/* Destacado */}
        <label className="pform__toggle">
          <input
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleField}
            className="pform__toggle-input"
          />
          <span className="pform__toggle-track" />
          <span className="pform__toggle-label">
            Producto destacado
            <span className="pform__toggle-hint">Aparece en la página principal</span>
          </span>
        </label>

        {/* Botones */}
        <div className="pform__footer">
          <Link to="/admin" className="pform__cancel">Cancelar</Link>
          <button type="submit" className="pform__submit" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>

      </form>
    </div>
  )
}
