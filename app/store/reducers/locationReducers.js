import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  SET_LOCATION_ID_SUCCESS,
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

export const setLocationIdReducer = (state = { locationId: null }, action) => {

  switch(action.type) {

    case SET_LOCATION_ID_SUCCESS:
      return { locationId: action.payload }

    default:
      return state
  }
}