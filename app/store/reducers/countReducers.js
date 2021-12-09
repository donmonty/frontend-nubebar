
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
  COUNT_PENDING_SUMMARY_REQUEST,
  COUNT_PENDING_SUMMARY_SUCCESS,
  COUNT_PENDING_SUMMARY_FAIL,
  COUNT_DONE_SUMMARY_REQUEST,
  COUNT_DONE_SUMMARY_SUCCESS,
  COUNT_DONE_SUMMARY_FAIL,
  SUMMARY_TYPE_SUCCESS,
  BOTTLES_PENDING_REQUEST,
  BOTTLES_PENDING_SUCCESS,
  BOTTLES_PENDING_FAIL,
  BOTTLES_DONE_REQUEST,
  BOTTLES_DONE_SUCCESS,
  BOTTLES_DONE_FAIL,
  BOTTLE_COUNTS_REQUEST,
  BOTTLE_COUNTS_SUCCESS,
  BOTTLE_COUNTS_FAIL,
  CLOSE_COUNT_REQUEST,
  CLOSE_COUNT_SUCCESS,
  CLOSE_COUNT_FAIL,
  SET_COUNT_STATE_SUCCESS,
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

export const countPendingSummaryReducer = (state = { countPendingSummary: [] }, action) => {
   switch (action.type) {

    case COUNT_PENDING_SUMMARY_REQUEST:
      return { ...state, loading: true }

    case COUNT_PENDING_SUMMARY_SUCCESS:
      return { countPendingSummary: action.payload, loading: false }

    case COUNT_PENDING_SUMMARY_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
   }
}

export const countDoneSummaryReducer = (state = { countDoneSummary: [] }, action) => {
  switch (action.type) {

   case COUNT_DONE_SUMMARY_REQUEST:
     return { ...state, loading: true }

   case COUNT_DONE_SUMMARY_SUCCESS:
     return { countDoneSummary: action.payload, loading: false }

   case COUNT_DONE_SUMMARY_FAIL:
     return { loading: false, error: action.payload }

   default:
     return state
  }
}

export const countSummaryTypeReducer = (state = { countSummaryType: 'PENDING' }, action) => {

  switch (action.type) {

    case SUMMARY_TYPE_SUCCESS:
      return { countSummaryType: action.payload }

    default:
      return state
  }
}

export const setCountStateReducer = (state = { countState: '0' }, action) => {

  switch(action.type) {

    case SET_COUNT_STATE_SUCCESS:
      return { countState: action.payload }

    default:
      return state
  }
}

export const pendingBottlesReducer = (state = { pendingBottlesList: [] }, action) => {
   switch (action.type) {

    case BOTTLES_PENDING_REQUEST:
      return { ...state, loading: true }

    case BOTTLES_PENDING_SUCCESS:
      return { pendingBottlesList: action.payload, loading: false }

    case BOTTLES_PENDING_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
   }
}

export const doneBottlesReducer = (state = { doneBottlesList: [] }, action) => {
  switch (action.type) {

   case BOTTLES_DONE_REQUEST:
     return { ...state, loading: true }

   case BOTTLES_DONE_SUCCESS:
     return { doneBottlesList: action.payload, loading: false }

   case BOTTLES_DONE_FAIL:
     return { loading: false, error: action.payload }

   default:
     return state
  }
}

export const bottleCountsReducer = (state = { bottleCounts: [], bottle: {}, loading: true }, action) => {
  switch (action.type) {

    case BOTTLE_COUNTS_REQUEST:
      return { ...state, loading: true }

    case BOTTLE_COUNTS_SUCCESS:
      return { 
        bottleCounts: action.payload.bottleCounts, 
        bottle: action.payload.bottle, 
        loading: false 
      }

    case BOTTLE_COUNTS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const closeCountReducer = (state = { countState: "OPEN" }, action) => {

  switch (action.type) {

    case CLOSE_COUNT_REQUEST:
      return { ...state, loading: true }

    case CLOSE_COUNT_SUCCESS:
      return { countState: "CLOSED", loading: false }

    case CLOSE_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}