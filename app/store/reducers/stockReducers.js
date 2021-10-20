import {
  STOCK_PRODUCT_LIST_REQUEST,
  STOCK_PRODUCT_LIST_SUCCESS,
  STOCK_PRODUCT_LIST_FAIL,
  STOCK_PRODUCT_BOTTLE_LIST_REQUEST,
  STOCK_PRODUCT_BOTTLE_LIST_SUCCESS,
  STOCK_PRODUCT_BOTTLE_LIST_FAIL
} from '../constants/stockConstants'


export const getStockProductListReducer = (state = { stockProductListSummary: {}, stockProductListData: [] }, action) => {

  switch (action.type) {

    case STOCK_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }

    case STOCK_PRODUCT_LIST_SUCCESS:
      return {
        stockProductListSummary: action.payload.stockProductListSummary,
        stockProductListData: action.payload.stockProductListData,
        loading: false
      }

    case STOCK_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }

}

export const getStockProductBottleListReducer = (state ={ stockProductBottleListData: [] }, action) => {

  switch (action.type) {

    case STOCK_PRODUCT_BOTTLE_LIST_REQUEST:
      return { ...state, loading: true }

    case STOCK_PRODUCT_BOTTLE_LIST_SUCCESS:
      return { stockProductBottleListData: action.payload.stockProductBottleListData, loading: false }

    case STOCK_PRODUCT_BOTTLE_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}