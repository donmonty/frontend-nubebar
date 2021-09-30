import getBottle from "../../api/getBottle"
import bottle from "../../api/bottle"
import {
  BOTTLE_DETAILS_REQUEST,
  BOTTLE_DETAILS_SUCCESS,
  BOTTLE_DETAILS_FAIL,
  BOTTLE_WEIGHT_REQUEST,
  BOTTLE_WEIGHT_SUCCESS,
  BOTTLE_WEIGHT_FAIL,
  BOTTLE_SET_WEIGHT_REQUEST,
  BOTTLE_SET_WEIGHT_SUCCESS,
  BOTTLE_SET_WEIGHT_RESET,
  BOTTLE_CREATE_REQUEST,
  BOTTLE_CREATE_SUCCESS,
  BOTTLE_CREATE_FAIL
} from "../constants/bottleConstants"


export const listBottleDetails = (qrCode) => async (dispatch) => {
  dispatch({ type: BOTTLE_DETAILS_REQUEST })
  const response = await getBottle.getBottleId(qrCode)
  if (!response.ok) return dispatch({ type: BOTTLE_DETAILS_FAIL, payload: response.problem })
  const data = response.data.body
  dispatch({ type: BOTTLE_DETAILS_SUCCESS, payload: data })
}

export const setBottleWeight = (weight) => (dispatch) => {
  //dispatch({ type: BOTTLE_SET_WEIGHT_REQUEST })
  dispatch( { type: BOTTLE_SET_WEIGHT_SUCCESS, payload: weight })
}

export const resetBottleWeight = () => (dispatch) => {
  dispatch({ type: BOTTLE_SET_WEIGHT_RESET })
}

export const getBottleWeight = (weight) => (dispatch) => {
  dispatch({ type: BOTTLE_WEIGHT_REQUEST })
  if (!weight) return dispatch({ type: BOTTLE_WEIGHT_FAIL, payload: "Weight error" })
  dispatch({ type: BOTTLE_WEIGHT_SUCCESS, payload: weight })
}

export const addNewBottle = (args) => async (dispatch) => {
  dispatch({ type: BOTTLE_CREATE_REQUEST })
  const response = await bottle.addNewBottle(args)
  if (!response.ok) return dispatch({ type: BOTTLE_CREATE_FAIL, payload: response.problem })
  dispatch({ type: BOTTLE_CREATE_SUCCESS, payload: response.data })
}