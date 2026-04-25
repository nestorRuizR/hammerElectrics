const express  = require('express')
const cors     = require('cors')
const path     = require('path')
const products = require('./routes/products')

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/products', products)

app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`)
})
