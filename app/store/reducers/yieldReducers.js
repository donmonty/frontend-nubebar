import {
  GET_YIELD_REPORT_REQUEST,
  GET_YIELD_REPORT_SUCCESS,
  GET_YIELD_REPORT_FAIL,
  GET_YIELD_REPORTS_REQUEST,
  GET_YIELD_REPORTS_SUCCESS,
  GET_YIELD_REPORTS_FAIL,
  SET_YIELD_REPORT_ID_SUCCESS,
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

export const getYieldReportsReducer = (state = { yieldReports: [] }, action) => {

  switch (action.type) {

    case GET_YIELD_REPORTS_REQUEST:
      return { ...state, loading: true }

    case GET_YIELD_REPORTS_SUCCESS:
      return { yieldReports: action.payload, loading: false }

    case GET_YIELD_REPORTS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const setYieldReportIdReducer = (state = { yieldReportId: null }, action) => {
  switch (action.type) {
    case SET_YIELD_REPORT_ID_SUCCESS:
      return { yieldReportId: action.payload }

    default:
      return state
  }
}

