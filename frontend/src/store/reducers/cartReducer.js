import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADRESS
} from '../types/cartTypes'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shipping-address')
  ? JSON.parse(localStorage.getItem('shipping-address'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('payment-method')
  ? JSON.parse(localStorage.getItem('payment-method'))
  : {}

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage
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
    case CART_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
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

  if (!existItem)
    return {
      ...state,
      cartItems: [...state.cartItems, item]
    }

  return {
    ...state,
    // if the item exists then replace it with the new one
    // else keep it in the cartItems
    cartItems: [...state.cartItems].map((x) =>
      x.product === item.product ? item : x
    )
  }
}
