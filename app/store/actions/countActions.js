import count from "../../api/count"
import {
  QUICK_COUNTS_LIST_REQUEST,
  QUICK_COUNTS_LIST_SUCCESS,
  QUICK_COUNTS_LIST_FAIL,
  TOTAL_COUNTS_LIST_REQUEST,
  TOTAL_COUNTS_LIST_SUCCESS,
  TOTAL_COUNTS_LIST_FAIL,
  COUNT_TYPE_SUCCESS,
} from "../constants/countConstants"


export const listQuickCounts = (storageAreaId) => async (dispatch) => {
  dispatch({ type: QUICK_COUNTS_LIST_REQUEST })
  const response = await count.getQuickCounts(storageAreaId)
  if (!response.ok) return dispatch({ type: QUICK_COUNTS_LIST_FAIL, payload: response.error })
  dispatch({ type: QUICK_COUNTS_LIST_SUCCESS, payload: response.data.data})
} 

export const listTotalCounts = (storageAreaId) => async (dispatch) => {
  dispatch({ type: TOTAL_COUNTS_LIST_REQUEST })
  const response = await count.getTotalCounts(storageAreaId)
  if (!response.ok) return dispatch({ type: TOTAL_COUNTS_LIST_FAIL, payload: response.error })
  dispatch({ type: TOTAL_COUNTS_LIST_SUCCESS, payload: response.data.data})
} 

export const setCountType = (countType) => (dispatch) => {
  dispatch({ type: COUNT_TYPE_SUCCESS, payload: countType })
}