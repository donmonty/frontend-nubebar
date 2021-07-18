import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"


export const productDetailsReducer = (state = { product: {} }, action) => {
  switch(action.type) {

    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }

    case PRODUCT_DETAILS_SUCCESS: 
      return { product: action.payload, loading: false }

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}