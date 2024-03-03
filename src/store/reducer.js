import {CLEAR_CART, REMOVE, INCREASE, DECREASE} from './action'
import {data} from '../data'

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return {...state, cartItems: []}
  }
  if (action.type === REMOVE) {
    let newCartItems = cartItems.filter(item => item.id !== action.payload.id)
    return{...state, cartItems: newCartItems}
  }
}