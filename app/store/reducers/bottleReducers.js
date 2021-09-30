import {
  BOTTLE_DETAILS_REQUEST,
  BOTTLE_DETAILS_SUCCESS,
  BOTTLE_DETAILS_FAIL,
  BOTTLE_SET_WEIGHT_REQUEST,
  BOTTLE_SET_WEIGHT_SUCCESS,
  BOTTLE_SET_WEIGHT_FAIL,
  BOTTLE_SET_WEIGHT_RESET,
  BOTTLE_CREATE_REQUEST,
  BOTTLE_CREATE_SUCCESS,
  BOTTLE_CREATE_FAIL,
} from "../constants/bottleConstants"

export const bottleDetailsReducer = (state = { bottle: {} }, action) => {

  switch(action.type) {

    case BOTTLE_DETAILS_REQUEST:
      return { ...state, loading: true }

    case BOTTLE_DETAILS_SUCCESS:
      return { bottle: action.payload, loading: false }

    case BOTTLE_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const bottleWeightReducer = (state = { weight: null }, action) => {

  switch(action.type) {

    case BOTTLE_SET_WEIGHT_REQUEST:
      return state

    case BOTTLE_SET_WEIGHT_SUCCESS:
      return { weight: action.payload }

    case BOTTLE_SET_WEIGHT_FAIL:
      return { error: action.payload }
    
    case BOTTLE_SET_WEIGHT_RESET:
      return { weight: null }

    default:
      return state
  }
}

export const bottleCreateReducer = (state = {}, action) => {
  switch(action.type) {

    case BOTTLE_CREATE_REQUEST:
      return { loading: true }

    case BOTTLE_CREATE_SUCCESS:
      return { loading: false, success: true, bottle: action.payload }

    case BOTTLE_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}