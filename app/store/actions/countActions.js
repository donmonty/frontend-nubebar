import count from "../../api/count"
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