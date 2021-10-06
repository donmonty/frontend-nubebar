import {
  QUICK_COUNTS_LIST_REQUEST,
  QUICK_COUNTS_LIST_SUCCESS,
  QUICK_COUNTS_LIST_FAIL,
  TOTAL_COUNTS_LIST_REQUEST,
  TOTAL_COUNTS_LIST_SUCCESS,
  TOTAL_COUNTS_LIST_FAIL,
  COUNT_TYPE_SUCCESS,
} from "../constants/countConstants"


export const quickCountsReducer = (state = { quickCounts: [] }, action) => {

  switch(action.type) {

    case QUICK_COUNTS_LIST_REQUEST:
      return { ...state, loading: true }

    case QUICK_COUNTS_LIST_SUCCESS:
      return { quickCounts: action.payload, loading: false }

    case QUICK_COUNTS_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const totalCountsReducer = (state = { totalCounts: [] }, action) => {

  switch(action.type) {

    case TOTAL_COUNTS_LIST_REQUEST:
      return { ...state, loading: true }

    case TOTAL_COUNTS_LIST_SUCCESS:
      return { totalCounts: action.payload, loading: false }

    case TOTAL_COUNTS_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const countTypeReducer = (state = { countType: 'DIARIA' }, action) => {
  
  switch(action.type) {

    case COUNT_TYPE_SUCCESS:
      return { countType: action.payload }

    default:
      return state
  }
}