import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL
} from '../types/productTypes'

const initialState = {
  products: [],
  product: {
    reviews: []
  },
  error: null,
  loading: false,
  success: {
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false
  }
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: {
          createSuccess: false,
          updateSuccess: false,
          deleteSuccess: false
        }
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        success: {
          createSuccess: true
        }
      }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: {
          updateSuccess: true
        }
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products].filter(
          (product) => product._id !== action.payload
        ),
        success: {
          deleteSuccess: true
        }
      }
    case PRODUCT_LIST_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
