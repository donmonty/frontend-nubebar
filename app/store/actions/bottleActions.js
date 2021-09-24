import getBottle from "../../api/getBottle"
import {
  BOTTLE_DETAILS_REQUEST,
  BOTTLE_DETAILS_SUCCESS,
  BOTTLE_DETAILS_FAIL,
  BOTTLE_WEIGHT_REQUEST,
  BOTTLE_WEIGHT_SUCCESS,
  BOTTLE_WEIGHT_FAIL
} from "../constants/bottleConstants"


export const listBottleDetails = (qrCode) => async (dispatch) => {
  dispatch({ type: BOTTLE_DETAILS_REQUEST })
  const response = await getBottle.getBottleId(qrCode)
  if (!response.ok) return dispatch({ type: BOTTLE_DETAILS_FAIL, payload: response.problem })
  const data = response.data.body
  dispatch({ type: BOTTLE_DETAILS_SUCCESS, payload: data })
}

export const getBottleWeight = (weight) => (dispatch) => {
  dispatch({ type: BOTTLE_WEIGHT_REQUEST })
  if (!weight) return dispatch({ type: BOTTLE_WEIGHT_FAIL, payload: "Weight error" })
  dispatch({ type: BOTTLE_WEIGHT_SUCCESS, payload: weight })
}