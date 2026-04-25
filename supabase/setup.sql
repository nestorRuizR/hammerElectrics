-- ============================================================
-- HAMMER ELECTRIC — Setup Supabase
-- Ejecuta este script en: supabase.com → SQL Editor → New query
-- ============================================================

-- 1. Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT          NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  category    TEXT          NOT NULL,
  image       TEXT,
  stock       INTEGER       NOT NULL DEFAULT 0,
  featured    BOOLEAN       NOT NULL DEFAULT false,
  description TEXT          NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- 2. Row Level Security — lectura pública, escritura pública
--    (el acceso de escritura está protegido por la clave del panel /admin)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read"  ON products;
DROP POLICY IF EXISTS "public_write" ON products;

CREATE POLICY "public_read"  ON products FOR SELECT USING (true);
CREATE POLICY "public_write" ON products FOR ALL   USING (true) WITH CHECK (true);

-- 3. Datos iniciales
INSERT INTO products (name, price, category, stock, featured, description) VALUES
  ('Tablero Metálico 6 Polos',        55.00,  'tableros',        20,  false, 'Tablero de distribución monofásico para 6 llaves, con tapa, bornera de neutros y riel DIN.'),
  ('Tablero Metálico 12 Polos',       85.00,  'tableros',        15,  true,  'Tablero de distribución monofásico 12 polos, con tapa y riel DIN incluido.'),
  ('Tablero Metálico 24 Polos',      140.00,  'tableros',         8,  false, 'Tablero de distribución trifásico 24 polos para instalaciones industriales o multifamiliares.'),
  ('Llave Termomagnética 1x16A',      18.00,  'termomagneticas', 80,  false, 'Interruptor termomagnético monopolar 16A para circuitos de iluminación y tomacorrientes.'),
  ('Llave Termomagnética 2x20A',      32.00,  'termomagneticas', 60,  true,  'Interruptor termomagnético bipolar 2x20A, ideal para circuitos de cocina y lavandería.'),
  ('Llave Termomagnética 2x32A',      42.00,  'termomagneticas', 40,  false, 'Interruptor termomagnético bipolar 2x32A para circuitos de alta demanda.'),
  ('Llave Termomagnética 3x40A',      65.00,  'termomagneticas', 25,  false, 'Interruptor termomagnético tripolar 3x40A para tableros trifásicos.'),
  ('Diferencial 2x25A 30mA',          89.00,  'diferenciales',   25,  true,  'Interruptor diferencial bipolar 2x25A 30mA, protección contra corrientes de fuga.'),
  ('Diferencial 2x40A 30mA',         110.00,  'diferenciales',   20,  false, 'Interruptor diferencial bipolar 2x40A 30mA para circuitos de mayor carga.'),
  ('Diferencial 4x40A 30mA',         145.00,  'diferenciales',   12,  false, 'Interruptor diferencial tetrapolar 4x40A 30mA para instalaciones trifásicas.'),
  ('Cable NYY 2.5mm² (metro)',          5.80,  'cables',         400,  false, 'Cable de energía NYY 2.5mm² unipolar para instalaciones interiores, venta por metro.'),
  ('Cable NYY 4mm² (metro)',            8.50,  'cables',         300,  false, 'Cable de energía NYY 4mm² unipolar para tableros y circuitos de alimentación.'),
  ('Cable THW 14AWG (metro)',           2.80,  'cables',         500,  false, 'Cable unipolar THW calibre 14AWG (2.5mm²), 600V, venta por metro.'),
  ('Riel DIN 35mm x 1m',             12.00,  'instalaciones',    60,  false, 'Riel DIN simétrico 35mm, 1 metro, para montaje de interruptores en tablero.'),
  ('Bornera de Neutros 12 puntos',    22.00,  'instalaciones',    35,  false, 'Bornera de neutros de 12 puntos con tornillo para tablero eléctrico.'),
  ('Canaleta PVC 40x25mm (metro)',    12.00,  'instalaciones',   100,  false, 'Canaleta ranurada PVC 40x25mm para organizar cableado en instalaciones.'),
  ('Tubo Conduit PVC 3/4" x 3m',      5.50,  'instalaciones',   150,  false, 'Tubo conduit de PVC 3/4 pulgadas por 3 metros para protección de cables.'),
  ('Tomacorriente Doble con Tierra',  14.00,  'accesorios',       90,  false, 'Tomacorriente doble con toma a tierra, 16A 250V, para instalaciones residenciales.'),
  ('Interruptor Simple 10A',           8.50,  'accesorios',      120,  false, 'Interruptor de luz simple 10A 250V para circuitos de iluminación.');


-- ============================================================
-- STORAGE: crear el bucket en el Dashboard de Supabase
-- Storage → New bucket → Nombre: "product-images" → Public: ON
-- ============================================================
