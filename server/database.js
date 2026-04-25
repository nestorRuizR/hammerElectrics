const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'data.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    price       REAL    NOT NULL,
    category    TEXT    NOT NULL,
    image       TEXT,
    stock       INTEGER NOT NULL DEFAULT 0,
    featured    INTEGER NOT NULL DEFAULT 0,
    description TEXT    NOT NULL DEFAULT ''
  )
`)

const count = db.prepare('SELECT COUNT(*) as c FROM products').get()
if (count.c === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, price, category, image, stock, featured, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )
  const seed = [
    ['Taladro Percutor 750W',     189.90, 'herramientas', null, 12,  1, 'Taladro percutor de 750W ideal para trabajos de albañilería y carpintería.'],
    ['Juego de Llaves Allen',       24.50, 'herramientas', null, 30,  0, 'Set de 9 llaves hexagonales de acero al cromo-vanadio.'],
    ['Cable THW 14AWG (m)',           2.80, 'electricidad', null, 500, 0, 'Cable unipolar THW calibre 14AWG, venta por metro.'],
    ['Interruptor Termomagnético',   45.00, 'electricidad', null, 20,  1, 'Interruptor termomagnético 2x20A para tablero eléctrico.'],
    ['Tubo PVC 2" x 3m',            12.50, 'plomeria',     null, 80,  0, 'Tubo de PVC para desagüe de 2 pulgadas por 3 metros.'],
    ['Pintura Látex Blanco 4L',     68.00, 'pintura',      null, 15,  1, 'Pintura látex lavable color blanco mate, rendimiento 40 m² por galón.'],
  ]
  seed.forEach(r => insert.run(...r))
}

module.exports = db
