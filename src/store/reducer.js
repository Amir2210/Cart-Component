import { CLEAR_CART, REMOVE, INCREASE, DECREASE } from './action'
import cartItems from '../data'

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cartItems: [] }
  }
  if (action.type === REMOVE) {
    let newCartItems = state.cartItems.filter(item => item.id !== action.payload.id)
    return { ...state, cartItems: newCartItems }
  }
  // CART ACTIONS
  if (action.type === INCREASE) {
    const newItem = state.cartItems.find(item => item.id === action.payload.id)
    newItem.amount++
    return { ...state, [cartItems]: newItem }
  }
  if (action.type === DECREASE) {
    const newItem = state.cartItems.find(item => item.id === action.payload.id)
    newItem.amount--
    return { ...state, [cartItems]: newItem }
  }
  throw new Error(`No matching "${action.type}" - action type`);
}

