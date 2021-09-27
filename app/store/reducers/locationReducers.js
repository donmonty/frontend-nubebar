import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL
} from '../constants/locationConstants'

export const locationListReducer = (state = { locations: [] }, action ) => {
  switch(action.type) {
    
    case LOCATION_LIST_REQUEST:
      return { ...state, loading: true }

    case LOCATION_LIST_SUCCESS:
      return { locations: action.payload, loading: false }

    case LOCATION_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state

  }
}