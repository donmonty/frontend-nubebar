import performance from "../../api/yield"

import {
  GET_YIELD_REPORT_REQUEST,
  GET_YIELD_REPORT_SUCCESS,
  GET_YIELD_REPORT_FAIL,
  GET_YIELD_REPORTS_REQUEST,
  GET_YIELD_REPORTS_SUCCESS,
  GET_YIELD_REPORTS_FAIL,
  SET_YIELD_REPORT_ID_SUCCESS,
} from "../constants/yieldConstants"


export const getYieldReport = (args) => async (dispatch) => {
  dispatch({ type: GET_YIELD_REPORT_REQUEST })
  const response = await performance.getYieldReport(args)
  if (!response.ok) return dispatch({ type: GET_YIELD_REPORT_FAIL, payload: response.problem })
  const reportData = {
    id: response.data.id,
    createdAt: response.data.fecha_registro,
    startDate: response.data.fecha_inicial,
    finishDate: response.data.fecha_final,
    countId: response.data.inspeccion.id,
    countType: response.data.inspeccion.tipo,
    storageAea: response.data.almacen.nombre
  }
  const yieldData = response.data.mermas_reporte.map(item => item)
  for (let item of yieldData) {
    item.porcentaje = Math.round(Number(item.porcentaje))
    item.consumo_real = Math.round(Number(item.consumo_real))
    item.consumo_ventas = Math.round(Number(item.consumo_ventas))
    item.merma = Math.round(Number(item.merma))
  }
  dispatch({ type: GET_YIELD_REPORT_SUCCESS, payload: { reportData, yieldData } })
}

export const getYieldReports = (storageAreaId) => async (dispatch) => {
  dispatch({ type: GET_YIELD_REPORTS_REQUEST })
  const response = await performance.getYieldReports(storageAreaId)
  if (!response.ok) return dispatch({ type: GET_YIELD_REPORTS_FAIL, payload: response.problem })
  dispatch({ type: GET_YIELD_REPORTS_SUCCESS, payload: response.data })
}

export const setYieldReportId = (id) => (dispatch) => {
  dispatch({ type: SET_YIELD_REPORT_ID_SUCCESS, payload: id })
}

