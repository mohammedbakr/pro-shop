import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cartTypes'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cartItems: cartItemsFromStorage
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return findAndPush(state, action)
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (item) => item.product !== action.payload
        )
      }

    default:
      return state
  }
}

const findAndPush = (state, action) => {
  const item = action.payload

  const existItem = [...state.cartItems].find(
    (existItem) => existItem.product === item.product
  )

  if (existItem)
    return {
      ...state,
      cartItems: [...state.cartItems].map((x) =>
        // if the item exists then replace it with the new one
        // else keep it in the cartItems
        x.product === item.product ? item : x
      )
    }
  else
    return {
      ...state,
      cartItems: [...state.cartItems, item]
    }
}
