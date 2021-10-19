import {
  GET_YIELD_REPORT_REQUEST,
  GET_YIELD_REPORT_SUCCESS,
  GET_YIELD_REPORT_FAIL,
  GET_YIELD_REPORTS_REQUEST,
  GET_YIELD_REPORTS_SUCCESS,
  GET_YIELD_REPORTS_FAIL,
  SET_YIELD_REPORT_ID_SUCCESS,
  GET_YIELD_SALES_DATA_REQUEST,
  GET_YIELD_SALES_DATA_SUCCESS,
  GET_YIELD_SALES_DATA_FAIL,
  SET_YIELD_ID_SUCCESS,
  GET_YIELD_BOTTLE_DATA_REQUEST,
  GET_YIELD_BOTTLE_DATA_SUCCESS,
  GET_YIELD_BOTTLE_DATA_FAIL,
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

export const getYieldSalesDataReducer = (state = { ingredient: null, yieldSalesData: [] }, action) => {

  switch (action.type) {

    case GET_YIELD_SALES_DATA_REQUEST:
      return { ...state, loading: true }

    case GET_YIELD_SALES_DATA_SUCCESS:
      return {
        ingredient: action.payload.ingredient,
        yieldSalesData: action.payload.yieldSalesData,
        loading: false
      }

    case GET_YIELD_SALES_DATA_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
} 

export const setYieldIdReducer = (state = { yieldId: null }, action) => {
  
  switch (action.type) {
    
    case SET_YIELD_ID_SUCCESS:
      return { yieldId: action.payload }

    default:
      return state
  }
}

export const getYieldBottleDataReducer = (state = { yieldBottleSummary: {}, yieldBottleData: [] }, action) => {

  switch (action.type) {

    case GET_YIELD_BOTTLE_DATA_REQUEST:
      return { ...state, loading: true }

    case GET_YIELD_BOTTLE_DATA_SUCCESS:
      return { 
        yieldBottleSummary: action.payload.yieldBottleSummary,
        yieldBottleData: action.payload.yieldBottleData,
        loading: false
      }

    case GET_YIELD_BOTTLE_DATA_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

