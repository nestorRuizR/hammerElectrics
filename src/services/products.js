export const CATEGORIES = [
  { id: 'tableros',        label: 'Tableros',           icon: '⚡' },
  { id: 'termomagneticas', label: 'Termomagnéticas',    icon: '🔌' },
  { id: 'diferenciales',   label: 'Diferenciales',      icon: '🛡️' },
  { id: 'cables',          label: 'Cables',             icon: '🔋' },
  { id: 'instalaciones',   label: 'Instalaciones',      icon: '🔧' },
  { id: 'accesorios',      label: 'Accesorios',         icon: '🪛' },
]

// Datos de semilla — usa el SQL de supabase/seed.sql para cargarlos en Supabase
export const SEED_PRODUCTS = [
  { name: 'Tablero Metálico 6 Polos',          price: 55.00,  category: 'tableros',        stock: 20,  featured: false, description: 'Tablero de distribución monofásico para 6 llaves, con tapa, bornera de neutros y riel DIN.' },
  { name: 'Tablero Metálico 12 Polos',         price: 85.00,  category: 'tableros',        stock: 15,  featured: true,  description: 'Tablero de distribución monofásico 12 polos, con tapa y riel DIN incluido.' },
  { name: 'Tablero Metálico 24 Polos',         price: 140.00, category: 'tableros',        stock: 8,   featured: false, description: 'Tablero de distribución trifásico 24 polos para instalaciones industriales o multifamiliares.' },
  { name: 'Llave Termomagnética 1x16A',        price: 18.00,  category: 'termomagneticas', stock: 80,  featured: false, description: 'Interruptor termomagnético monopolar 16A para circuitos de iluminación y tomacorrientes.' },
  { name: 'Llave Termomagnética 2x20A',        price: 32.00,  category: 'termomagneticas', stock: 60,  featured: true,  description: 'Interruptor termomagnético bipolar 2x20A, ideal para circuitos de cocina y lavandería.' },
  { name: 'Llave Termomagnética 2x32A',        price: 42.00,  category: 'termomagneticas', stock: 40,  featured: false, description: 'Interruptor termomagnético bipolar 2x32A para circuitos de alta demanda.' },
  { name: 'Llave Termomagnética 3x40A',        price: 65.00,  category: 'termomagneticas', stock: 25,  featured: false, description: 'Interruptor termomagnético tripolar 3x40A para tableros trifásicos.' },
  { name: 'Diferencial 2x25A 30mA',           price: 89.00,  category: 'diferenciales',   stock: 25,  featured: true,  description: 'Interruptor diferencial bipolar 2x25A 30mA, protección contra corrientes de fuga.' },
  { name: 'Diferencial 2x40A 30mA',           price: 110.00, category: 'diferenciales',   stock: 20,  featured: false, description: 'Interruptor diferencial bipolar 2x40A 30mA para circuitos de mayor carga.' },
  { name: 'Diferencial 4x40A 30mA',           price: 145.00, category: 'diferenciales',   stock: 12,  featured: false, description: 'Interruptor diferencial tetrapolar 4x40A 30mA para instalaciones trifásicas.' },
  { name: 'Cable NYY 2.5mm² (metro)',          price: 5.80,   category: 'cables',          stock: 400, featured: false, description: 'Cable de energía NYY 2.5mm² unipolar para instalaciones interiores, venta por metro.' },
  { name: 'Cable NYY 4mm² (metro)',            price: 8.50,   category: 'cables',          stock: 300, featured: false, description: 'Cable de energía NYY 4mm² unipolar para tableros y circuitos de alimentación.' },
  { name: 'Cable THW 14AWG (metro)',           price: 2.80,   category: 'cables',          stock: 500, featured: false, description: 'Cable unipolar THW calibre 14AWG (2.5mm²), 600V, venta por metro.' },
  { name: 'Riel DIN 35mm x 1m',              price: 12.00,  category: 'instalaciones',   stock: 60,  featured: false, description: 'Riel DIN simétrico 35mm, 1 metro, para montaje de interruptores en tablero.' },
  { name: 'Bornera de Neutros 12 puntos',     price: 22.00,  category: 'instalaciones',   stock: 35,  featured: false, description: 'Bornera de neutros de 12 puntos con tornillo para tablero eléctrico.' },
  { name: 'Canaleta PVC 40x25mm (metro)',     price: 12.00,  category: 'instalaciones',   stock: 100, featured: false, description: 'Canaleta ranurada PVC 40x25mm para organizar cableado en instalaciones.' },
  { name: 'Tubo Conduit PVC 3/4" x 3m',      price: 5.50,   category: 'instalaciones',   stock: 150, featured: false, description: 'Tubo conduit de PVC 3/4 pulgadas por 3 metros para protección de cables.' },
  { name: 'Tomacorriente Doble con Tierra',   price: 14.00,  category: 'accesorios',      stock: 90,  featured: false, description: 'Tomacorriente doble con toma a tierra, 16A 250V, para instalaciones residenciales.' },
  { name: 'Interruptor Simple 10A',           price: 8.50,   category: 'accesorios',      stock: 120, featured: false, description: 'Interruptor de luz simple 10A 250V para circuitos de iluminación.' },
]
