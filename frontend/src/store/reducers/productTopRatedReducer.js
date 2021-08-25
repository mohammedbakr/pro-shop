import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS
} from '../types/productTypes'

const initialState = {
  products: [],
  error: null,
  loading: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        loading: true
      }
    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload
      }
    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
