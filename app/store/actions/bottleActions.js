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
  BOTTLE_CREATE_FAIL,
  BOTTLE_SET_FOLIO_SUCCESS,
  BOTTLE_SET_FOLIO_RESET,
  BOTTLE_SET_CUSTOM_FOLIO_SUCCESS,
  BOTTLE_SET_CUSTOM_FOLIO_RESET,
  BOTTLE_CREATE_TYPE_SUCCESS,
  BOTTLE_CREATE_TYPE_RESET,
  BOTTLE_CREATE_USED_REQUEST,
  BOTTLE_CREATE_USED_SUCCESS,
  BOTTLE_CREATE_USED_FAIL,
  SET_BARCODE_SUCCESS,
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

export const addUsedBottle = (args) => async (dispatch) => {
  dispatch({ type: BOTTLE_CREATE_REQUEST })
  const response = await bottle.addUsedBottle(args)
  if (!response.ok) return dispatch({ type: BOTTLE_CREATE_FAIL, payload: response.problem })
  dispatch({ type: BOTTLE_CREATE_SUCCESS, payload: response.data })
}

export const setFolio = (folio) => (dispatch) => {
  dispatch({ type: BOTTLE_SET_FOLIO_SUCCESS, payload: folio })
}

export const resetFolio = () => (dispatch) => {
  dispatch({ type: BOTTLE_SET_FOLIO_RESET })
}

export const setCustomFolio = (customFolio) => (dispatch) => {
  dispatch({ type: BOTTLE_SET_CUSTOM_FOLIO_SUCCESS, payload: customFolio })
}

export const resetCustomFolio = () => (dispatch) => {
  dispatch({ type: BOTTLE_SET_CUSTOM_FOLIO_RESET })
}

export const setCreateType = (createType) => (dispatch) => {
  dispatch( { type: BOTTLE_CREATE_TYPE_SUCCESS, payload: createType })
}

export const resetCreateType = () => (dispatch) => {
  dispatch( { type: BOTTLE_CREATE_TYPE_RESET })
}

export const setBarcode = (barcode) => (dispatch) => {
  dispatch({ type: SET_BARCODE_SUCCESS, payload: barcode })
}