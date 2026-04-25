import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const BUCKET = 'product-images'

// ── Productos ────────────────────────────────────────────────────────────────

export async function fetchProducts(filters = {}) {
  let q = supabase.from('products').select('*').order('id')
  if (filters.category) q = q.eq('category', filters.category)
  if (filters.search)   q = q.ilike('name', `%${filters.search}%`)
  if (filters.featured) q = q.eq('featured', true)
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from('products').select('*').eq('id', id).single()
  if (error) throw new Error(error.message)
  return data
}

export async function createProduct({ name, price, category, stock, featured, description, imageFile }) {
  let image = null
  if (imageFile) image = await uploadImage(imageFile)
  const { data, error } = await supabase
    .from('products')
    .insert({ name, price: parseFloat(price), category, stock: parseInt(stock) || 0, featured, description: description || '', image })
    .select().single()
  if (error) { if (image) await removeImage(image); throw new Error(error.message) }
  return data
}

export async function updateProduct(id, { name, price, category, stock, featured, description, imageFile, existingImage }) {
  let image = existingImage ?? null
  if (imageFile) {
    image = await uploadImage(imageFile)
    if (existingImage) await removeImage(existingImage)
  }
  const { data, error } = await supabase
    .from('products')
    .update({ name, price: parseFloat(price), category, stock: parseInt(stock) || 0, featured, description: description || '', image })
    .eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteProduct(id, imageUrl) {
  if (imageUrl) await removeImage(imageUrl)
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── Imágenes (Supabase Storage) ──────────────────────────────────────────────

async function uploadImage(file) {
  const ext  = file.name.split('.').pop().toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (error) throw new Error(error.message)
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

async function removeImage(url) {
  if (!url) return
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const idx    = url.indexOf(marker)
  if (idx === -1) return
  const path = url.slice(idx + marker.length)
  await supabase.storage.from(BUCKET).remove([path])
}
