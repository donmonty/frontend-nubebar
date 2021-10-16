import {
  GET_YIELD_REPORT_REQUEST,
  GET_YIELD_REPORT_SUCCESS,
  GET_YIELD_REPORT_FAIL,
} from "../constants/yieldConstants"


export const getYieldReportReducer = (state = { reportData: {}, yieldData: [] }, action) => {

  switch (action.type) {

    case GET_YIELD_REPORT_REQUEST:
      return { ...state, loading: true }

    case GET_YIELD_REPORT_SUCCESS:
      return { 
        reportData: action.payload.reportData, 
        yieldData: action.payload.yieldData, 
        loading: false 
      }

    case GET_YIELD_REPORT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

