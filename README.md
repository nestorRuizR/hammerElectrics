# 🔧 Ferretería Marketplace

Marketplace mobile-first para ferretería. Construido con **React + Vite**.

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/      → Navbar, Footer, Layout
│   ├── ui/          → Botones, Cards, Inputs reutilizables
│   ├── product/     → ProductCard, ProductGallery, ProductFilter
│   └── cart/        → CartItem, CartSummary
├── pages/           → HomePage, ProductsPage, ProductDetailPage, CartPage
├── hooks/           → useProducts, useCart (custom hooks)
├── context/         → CartContext (estado global del carrito)
├── services/        → products.js (mock data → reemplazar con API)
└── assets/          → Imágenes e íconos
```

## Próximos pasos

- [ ] Diseñar Navbar con búsqueda y carrito
- [ ] Construir HomePage con categorías y productos destacados
- [ ] Implementar ProductsPage con filtros
- [ ] Conectar backend (Firebase / Supabase / Node.js)
- [ ] Gestión de imágenes de productos
- [ ] Flujo de checkout y pagos

## Iniciar el proyecto

```bash
npm install
npm run dev
```
