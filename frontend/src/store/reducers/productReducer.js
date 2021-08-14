import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS
} from '../types/productTypes'

const initialState = {
  products: [],
  product: {},
  error: null,
  loading: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        product: []
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        product: {}
      }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      }
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
