import count from "../../api/count"
import yield from "../../api/yield"
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
  BOTTLES_DONE_SUCCESS,
  BOTTLES_DONE_REQUEST,
  BOTTLES_DONE_FAIL,
  BOTTLE_COUNTS_REQUEST,
  BOTTLE_COUNTS_SUCCESS,
  BOTTLE_COUNTS_FAIL,
  CLOSE_COUNT_REQUEST,
  CLOSE_COUNT_SUCCESS,
  CLOSE_COUNT_FAIL,
} from "../constants/countConstants"


export const listQuickCounts = (storageAreaId) => async (dispatch) => {
  dispatch({ type: QUICK_COUNTS_LIST_REQUEST })
  const response = await count.getQuickCounts(storageAreaId)
  if (!response.ok) return dispatch({ type: QUICK_COUNTS_LIST_FAIL, payload: response.problem })
  dispatch({ type: QUICK_COUNTS_LIST_SUCCESS, payload: response.data.data})
} 

export const listTotalCounts = (storageAreaId) => async (dispatch) => {
  dispatch({ type: TOTAL_COUNTS_LIST_REQUEST })
  const response = await count.getTotalCounts(storageAreaId)
  if (!response.ok) return dispatch({ type: TOTAL_COUNTS_LIST_FAIL, payload: response.problem })
  dispatch({ type: TOTAL_COUNTS_LIST_SUCCESS, payload: response.data.data})
} 

export const setCountType = (countType) => (dispatch) => {
  dispatch({ type: COUNT_TYPE_SUCCESS, payload: countType })
}

export const createQuickCount = (args) => async (dispatch) => {
  dispatch({ type: CREATE_QUICK_COUNT_REQUEST })
  const response = await count.createQuickCount(args)
  if (!response.ok) return dispatch({ type: CREATE_QUICK_COUNT_FAIL, payload: response.problem })
  dispatch({ type: CREATE_QUICK_COUNT_SUCCESS, payload: response.data.data }) 
}

export const createTotalCount = (args) => async (dispatch) => {
  dispatch({ type: CREATE_TOTAL_COUNT_REQUEST })
  const response = await count.createTotalCount(args)
  if (!response.ok) return dispatch({ type: CREATE_TOTAL_COUNT_FAIL, payload: response.problem })
  dispatch({ type: CREATE_TOTAL_COUNT_SUCCESS, payload: response.data.data }) 
}

export const getCountSummary = (countId) => async (dispatch) => {
  dispatch({ type: COUNT_SUMMARY_REQUEST })
  const response = await count.getCountSummary(countId)
  if (!response.ok) return dispatch({ type: COUNT_SUMMARY_FAIL, payload: response.problem })
  dispatch({ type: COUNT_SUMMARY_SUCCESS, payload: response.data })
}

export const setCountActive = (status) => (dispatch) => {
  dispatch({ type: COUNT_ACTIVE_SUCCESS, payload: status })
}

export const getBottleCountDetails = (countId, qrCode) => async (dispatch) => {
  const COUNT_ERROR = "Esta botella no pertenece a la inspección."
  const BOTTLE_ERROR = "Algo salió mal. Inténtalo de nuevo."
  dispatch({ type: BOTTLE_COUNT_DETAILS_REQUEST })
  const bottleCountData = await count.getBottleCountDetails(countId, qrCode)
  if (!bottleCountData.ok) return dispatch({ type: BOTTLE_COUNT_DETAILS_FAIL, payload: COUNT_ERROR })
  const bottle = await count.getBottleDetails(qrCode)
  if (!bottle.ok) return dispatch({ type: BOTTLE_COUNT_DETAILS_FAIL, payload: BOTTLE_ERROR })
  dispatch({ type: BOTTLE_COUNT_DETAILS_SUCCESS, payload: { bottle: bottle.data, bottleCountData: bottleCountData.data } })
}

export const updateBottleWeight = (args) => async (dispatch) => {
  dispatch({ type: UPDATE_BOTTLE_WEIGHT_REQUEST })
  const response = await count.updateBottleWeight(args)
  if (!response.ok) return dispatch({ type: UPDATE_BOTTLE_WEIGHT_FAIL, payload: response.problem })
  dispatch({ type: UPDATE_BOTTLE_WEIGHT_SUCCESS, payload: response.data })
}

export const updateBottleState = (args) => async (dispatch) => {
  dispatch({ type: UPDATE_BOTTLE_STATE_REQUEST })
  const response = await count.updateBottleState(args)
  if (!response.ok) return dispatch({ type: UPDATE_BOTTLE_STATE_FAIL, payload: response.problem })
  dispatch({ type: UPDATE_BOTTLE_STATE_SUCCESS, payload: response.data })
}

export const setCountId = (countId) => (dispatch) => {
  dispatch({ type: SET_COUNT_ID_SUCCESS, payload: countId })
}

export const getCountPendingSummary = (countId) => async (dispatch) => {
  dispatch({ type: COUNT_PENDING_SUMMARY_REQUEST })
  const response = await count.getCountPendingSummary(countId)
  if (!response.ok) return dispatch({ type: COUNT_PENDING_SUMMARY_FAIL, payload: response.problem })
  dispatch({ type: COUNT_PENDING_SUMMARY_SUCCESS, payload: response.data })
}

export const getCountDoneSummary = (countId) => async (dispatch) => {
  dispatch({ type: COUNT_DONE_SUMMARY_REQUEST })
  const response = await count.getCountDoneSummary(countId)
  if (!response.ok) return dispatch({ type: COUNT_DONE_SUMMARY_FAIL, payload: response.problem })
  dispatch({ type: COUNT_DONE_SUMMARY_SUCCESS, payload: response.data })
}

export const setCountSummaryType = (countSummaryType) => (dispatch) => {
  dispatch({ type: SUMMARY_TYPE_SUCCESS, payload: countSummaryType })
}

export const listBottlesPending = (countId, product) => async (dispatch) => {
  dispatch({ type: BOTTLES_PENDING_REQUEST })
  const response = await count.getPendingBottles(countId, product)
  if (!response.ok) return dispatch({ type: BOTTLES_PENDING_FAIL, payload: response.problem })
  const bottles = response.data.map(item => item.botella)
  dispatch({ type: BOTTLES_PENDING_SUCCESS, payload: bottles })
}

export const listBottlesDone = (countId, product) => async (dispatch) => {
  dispatch({ type: BOTTLES_DONE_REQUEST })
  const response = await count.getDoneBottles(countId, product)
  if (!response.ok) return dispatch({ type: BOTTLES_DONE_FAIL, payload: response.problem })
  const bottles = response.data.map(item => item.botella)
  dispatch({ type: BOTTLES_DONE_SUCCESS, payload: bottles })
}

export const listBottleCounts = (bottleId) => async (dispatch) => {
  dispatch({ type: BOTTLE_COUNTS_REQUEST })
  const response = await count.getBottleCounts(bottleId)
  if (!response.ok) return dispatch({ type: BOTTLE_COUNTS_FAIL, payload: response.problem })
  const bottleCounts = response.data.inspecciones_botella.map(item => item)
  delete response.data.inspecciones_botella
  dispatch({ type: BOTTLE_COUNTS_SUCCESS, payload: { bottleCounts, bottle: response.data } })
}

export const closeCount = (args) => async (dispatch) => {
  dispatch({ type: CLOSE_COUNT_REQUEST })
  const countResponse = await count.closeCount(args)
  const yieldResponse = await yield.createYieldReport(args)
  if ((!countResponse.ok || !yieldResponse.ok)) return dispatch({ type: CLOSE_COUNT_FAIL, payload: (!countResponse.ok ? countResponse.problem : yieldResponse.problem) })
  dispatch({ type: CLOSE_COUNT_SUCCESS, payload: countResponse.data })
}

