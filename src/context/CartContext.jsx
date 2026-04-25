import { createContext, useContext, useReducer } from 'react'
const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const ex = state.items.find(i => i.id === action.payload.id)
      if (ex) return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY':  return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) }
    case 'CLEAR_CART':  return { ...state, items: [] }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const addItem    = (p)      => dispatch({ type: 'ADD_ITEM',    payload: p })
  const removeItem = (id)     => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQty  = (id, q)  => dispatch({ type: 'UPDATE_QTY',  payload: { id, qty: q } })
  const clearCart  = ()       => dispatch({ type: 'CLEAR_CART' })
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = state.items.reduce((s, i) => s + i.qty, 0)
  return <CartContext.Provider value={{ items: state.items, total, count, addItem, removeItem, updateQty, clearCart }}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)
