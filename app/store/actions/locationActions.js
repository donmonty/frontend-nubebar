import userLocations from "../../api/userLocations"
import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  SET_LOCATION_ID_SUCCESS,
} from "../constants/locationConstants"

import authStorage from "../../auth/storage"
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const storeData = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value)
//     await AsyncStorage.setItem('storedLocations', jsonValue)
//   } catch (e) {
//     console.log("Can't store locations:", e)
//   }
// }

export const listLocations = () => async (dispatch) => {
  dispatch({ type: LOCATION_LIST_REQUEST })
  const token = await authStorage.getToken()
  const response = await userLocations.getLocations(token)
  if (!response.ok) return dispatch({ type: LOCATION_LIST_FAIL, payload: response.problem })
  // storeData(response.data)
  dispatch({ type: LOCATION_LIST_SUCCESS, payload: response.data })
}

export const setLocationId = (locationId) => (dispatch) => {
  dispatch({ type: SET_LOCATION_ID_SUCCESS, payload: locationId })
}