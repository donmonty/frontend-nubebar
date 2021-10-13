
import {
  QUICK_COUNTS_LIST_REQUEST,
  QUICK_COUNTS_LIST_SUCCESS,
  QUICK_COUNTS_LIST_FAIL,
  TOTAL_COUNTS_LIST_REQUEST,
  TOTAL_COUNTS_LIST_SUCCESS,
  TOTAL_COUNTS_LIST_FAIL,
  COUNT_TYPE_SUCCESS,
  CREATE_QUICK_COUNT_REQUEST,
  CREATE_QUICK_COUNT_SUCCESS,
  CREATE_QUICK_COUNT_FAIL,
  CREATE_TOTAL_COUNT_REQUEST,
  CREATE_TOTAL_COUNT_SUCCESS,
  CREATE_TOTAL_COUNT_FAIL,
  COUNT_SUMMARY_REQUEST,
  COUNT_SUMMARY_SUCCESS,
  COUNT_SUMMARY_FAIL,
  COUNT_ACTIVE_SUCCESS,
  BOTTLE_COUNT_DETAILS_REQUEST,
  BOTTLE_COUNT_DETAILS_SUCCESS,
  BOTTLE_COUNT_DETAILS_FAIL,
  UPDATE_BOTTLE_WEIGHT_REQUEST,
  UPDATE_BOTTLE_WEIGHT_SUCCESS,
  UPDATE_BOTTLE_WEIGHT_FAIL,
  UPDATE_BOTTLE_STATE_REQUEST,
  UPDATE_BOTTLE_STATE_SUCCESS,
  UPDATE_BOTTLE_STATE_FAIL,
  SET_COUNT_ID_SUCCESS,
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

export const createQuickCountReducer = (state = { quickCountDetails: {} }, action) => {

  switch(action.type) {

    case CREATE_QUICK_COUNT_REQUEST:
      return { ...state, loading: true }

    case CREATE_QUICK_COUNT_SUCCESS:
      return { quickCountDetails: action.payload, loading: false }

    case CREATE_QUICK_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const createTotalCountReducer = (state = { totalCountDetails: {} }, action) => {

  switch(action.type) {
    
    case CREATE_TOTAL_COUNT_REQUEST:
      return { ...state, loading: true }

    case CREATE_TOTAL_COUNT_SUCCESS:
      return { totalCountDetails: action.payload, loading: false }

    case CREATE_TOTAL_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const getCountSummaryReducer = (state = { countSummary: {} }, action) => {

  switch(action.type) {

    case COUNT_SUMMARY_REQUEST:
      return { ...state, loading: true }

    case COUNT_SUMMARY_SUCCESS:
      return { countSummary: action.payload, loading: false }

    case COUNT_SUMMARY_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const setCountActiveReducer = (state = { countActive: false }, action) => {
  
  switch(action.type) {

    case COUNT_ACTIVE_SUCCESS:
      return { countActive: action.payload }

    default:
      return state
  }
}

export const getBottleCountDetailsReducer = (state = { bottle: {}, bottleCountData: {} }, action) => {

  switch (action.type) {

    case BOTTLE_COUNT_DETAILS_REQUEST:
      return { ...state, loading: true }

    case BOTTLE_COUNT_DETAILS_SUCCESS:
      return { 
        bottle: action.payload.bottle, 
        bottleCountData: action.payload.bottleCountData, 
        loading: false 
      }

    case BOTTLE_COUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const updateBottleWeightReducer = (state = { updatedBottle: {} }, action) => {

  switch (action.type) {

    case UPDATE_BOTTLE_WEIGHT_REQUEST:
      return { ...state, loading: true }

    case UPDATE_BOTTLE_WEIGHT_SUCCESS:
      return { updatedBottle: action.payload, loading: false }

    case UPDATE_BOTTLE_WEIGHT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
} 

export const updateBottleStateReducer = (state = { bottleState: {} }, action) => {

  switch (action.type) {

    case UPDATE_BOTTLE_STATE_REQUEST:
      return { ...state, loading: true }

    case UPDATE_BOTTLE_STATE_SUCCESS:
      return { bottleState: action.payload, loading: false }

    case UPDATE_BOTTLE_STATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const countIdReducer = (state = { countId: null }, action) => {

  switch (action.type) {

    case SET_COUNT_ID_SUCCESS:
      return { countId: action.payload }

    default: 
      return state
  }
}