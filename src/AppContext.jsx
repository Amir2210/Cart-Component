import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { CLEAR_CART, REMOVE, INCREASE, DECREASE } from './store/action'
import cartItems from './data'
import { reducer } from './store/reducer'

const defaultState = {
  cartItems: cartItems,
}

const GlobalContext = createContext()

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}


export function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {
    const totalItemsAmount = state.cartItems.reduce((acc, item) => acc + item.amount, 0)
    const getTotalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)

    setTotalItems(totalItemsAmount)
    setTotalPrice(getTotalPrice)
  }, [state.cartItems])

  function removeItem(id) {
    dispatch({ type: REMOVE, payload: { id } })
    const item = cartItems.find(item => item.id === id)
    setTotalItems(totalItems - item.amount)
    setTotalPrice(totalPrice - item.price * item.amount)
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART })
  }

  function increase(id) {
    dispatch({ type: INCREASE, payload: { id } })
    const item = cartItems.find(item => item.id === id)
    setTotalItems(totalItems + 1)
    setTotalPrice(totalPrice + item.price)
  }
  function decrease(id) {
    dispatch({ type: DECREASE, payload: { id } })
    const item = cartItems.find(item => item.id === id)
    setTotalItems(totalItems - 1)
    setTotalPrice(totalPrice - item.price)
  }
  return (
    <GlobalContext.Provider value={{ removeItem, clearCart, increase, decrease, state, totalItems, totalPrice }}>
      {children}
    </GlobalContext.Provider>
  )
}