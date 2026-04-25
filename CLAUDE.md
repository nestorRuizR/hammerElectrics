# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
```

No lint or test commands are configured yet.

## Architecture

Single-page React application (Vite + React Router v6), written in plain JavaScript (no TypeScript). The app is a mobile-first hardware store marketplace targeted at the Spanish-speaking market (UI text is in Spanish).

**Routing** is defined in `src/App.jsx` using React Router v6 nested routes, with `src/components/layout/Layout.jsx` as the outlet wrapper for all pages.

**State management** uses React Context API only — no external state library. The cart is managed in `src/context/CartContext.jsx` via `useReducer`, exposing `useCart()` hook to components.

**Product data** lives in `src/services/products.js` as a static mock array. `getProducts(filters)` handles client-side filtering by category, search term, and price. The `useProducts` hook in `src/hooks/useProducts.js` simulates async fetching with a mock delay.

## Current Development State

Only `HomePage` and the shared layout (Navbar, Footer) are fully implemented. The following pages are stubs and need to be built out:
- `src/pages/ProductsPage.jsx`
- `src/pages/ProductDetailPage.jsx`
- `src/pages/CartPage.jsx`

The directories `src/components/cart/`, `src/components/product/`, and `src/components/ui/` are placeholders with no components yet.

There is no backend integration. README mentions Firebase, Supabase, or Node.js as planned options.

## Design System

Global CSS variables (colors, spacing, typography) are defined in `src/index.css`. The Navbar includes a dedicated mobile navigation section. Product categories are: Herramientas, Electricidad, Plomería, Pintura, Fijación, Seguridad.

The `@` alias resolves to `/src` (configured in `vite.config.js`).
