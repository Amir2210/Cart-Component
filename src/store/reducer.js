import { CLEAR_CART, REMOVE, INCREASE, DECREASE } from './action'
import cartItems from '../data'

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cartItems: [] }
  }
  if (action.type === REMOVE) {
    console.log('state:', state.cartItems)
    let newCartItems = state.cartItems.filter(item => item.id !== action.payload.id)
    return { ...state, cartItems: newCartItems }
  }
  throw new Error(`No matching "${action.type}" - action type`);
}

