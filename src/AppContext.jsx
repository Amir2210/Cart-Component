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
  const totalItemsAmount = cartItems.reduce((acc, item) => acc + item.amount, 0)
  const [totalItems, setTotalItems] = useState(totalItemsAmount)

  useEffect(() => {
    setTotalItems(totalItemsAmount)
  }, [totalItemsAmount])

  function removeItem(id) {
    dispatch({ type: REMOVE, payload: { id } })
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART })
  }

  function increase(id) {
    dispatch({ type: INCREASE, payload: { id } })
  }
  function decrease(id) {
    dispatch({ type: DECREASE, payload: { id } })
  }
  return (
    <GlobalContext.Provider value={{ removeItem, clearCart, increase, decrease, state, totalItems }}>
      {children}
    </GlobalContext.Provider>
  )
}