import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AdminGuard from './components/admin/AdminGuard'
import AdminPage from './pages/admin/AdminPage'
import ProductFormPage from './pages/admin/ProductFormPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="productos/:id" element={<ProductDetailPage />} />
          <Route path="carrito" element={<CartPage />} />

          <Route path="admin" element={<AdminGuard />}>
            <Route index element={<AdminPage />} />
            <Route path="nuevo" element={<ProductFormPage />} />
            <Route path=":id/editar" element={<ProductFormPage />} />
          </Route>
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
