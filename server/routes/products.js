const express = require('express')
const multer  = require('multer')
const path    = require('path')
const fs      = require('fs')
const db      = require('../database')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Solo se permiten imágenes'), false)
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

const fmt = p => p ? { ...p, featured: Boolean(p.featured) } : null

// GET /api/products
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM products WHERE 1=1'
  const params = []
  if (req.query.category) { sql += ' AND category = ?'; params.push(req.query.category) }
  if (req.query.search)   { sql += ' AND name LIKE ?';  params.push(`%${req.query.search}%`) }
  if (req.query.featured) { sql += ' AND featured = 1' }
  res.json(db.prepare(sql).all(...params).map(fmt))
})

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' })
  res.json(fmt(p))
})

// POST /api/products
router.post('/', upload.single('image'), (req, res) => {
  const { name, price, category, stock, featured, description } = req.body
  const image = req.file ? `/uploads/${req.file.filename}` : null
  const result = db.prepare(
    'INSERT INTO products (name, price, category, image, stock, featured, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(name, parseFloat(price), category, image, parseInt(stock) || 0, featured === 'true' ? 1 : 0, description || '')
  res.status(201).json(fmt(db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid)))
})

// PUT /api/products/:id
router.put('/:id', upload.single('image'), (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Producto no encontrado' })

  const { name, price, category, stock, featured, description } = req.body
  let image = existing.image

  if (req.file) {
    if (existing.image) {
      const old = path.join(__dirname, '..', existing.image)
      if (fs.existsSync(old)) fs.unlinkSync(old)
    }
    image = `/uploads/${req.file.filename}`
  }

  db.prepare(
    'UPDATE products SET name=?, price=?, category=?, image=?, stock=?, featured=?, description=? WHERE id=?'
  ).run(name, parseFloat(price), category, image, parseInt(stock) || 0, featured === 'true' ? 1 : 0, description || '', req.params.id)

  res.json(fmt(db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)))
})

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' })
  if (p.image) {
    const imgPath = path.join(__dirname, '..', p.image)
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath)
  }
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

module.exports = router
