import {
  BOTTLE_DETAILS_REQUEST,
  BOTTLE_DETAILS_SUCCESS,
  BOTTLE_DETAILS_FAIL,
  BOTTLE_WEIGHT_REQUEST,
  BOTTLE_WEIGHT_SUCCESS,
  BOTTLE_WEIGHT_FAIL
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

    case BOTTLE_WEIGHT_REQUEST:
      return state

    case BOTTLE_WEIGHT_SUCCESS:
      return { weight: action.payload }

    case BOTTLE_WEIGHT_FAIL:
      return { error: action.payload }

    default:
      return state
  }
}