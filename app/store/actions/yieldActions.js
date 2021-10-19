import performance from "../../api/yield"

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
  GET_YIELD_BOTTLE_DATA_FAIL,
  GET_YIELD_BOTTLE_DATA_SUCCESS,
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

export const getYieldSalesData = (yieldId) => async (dispatch) => {
  dispatch({ type: GET_YIELD_SALES_DATA_REQUEST })
  const response = await performance.getYieldSalesData(yieldId)
  if (!response.ok) return dispatch({ type: GET_YIELD_SALES_DATA_FAIL, payload: response.problem })
  const ingredient = response.data.ingrediente
  const yieldSalesData = response.data.detalle_ventas.map(item => {
    const salesObj = {
      id: item.id,
      recipeName: item.receta__nombre,
      quantity: item.unidades,
      posCode: item.receta__codigo_pos,
      date: item.fecha,
      register: item.caja__nombre,
      amount: item.importe,
      recipeVolume: item.volumen_receta,
      salesVolume: item.volumen_vendido
    }
    return salesObj
  })
  dispatch({ type: GET_YIELD_SALES_DATA_SUCCESS, payload: { ingredient, yieldSalesData }})
}

export const setYieldId = (yieldId) => (dispatch) => {
  dispatch({ type: SET_YIELD_ID_SUCCESS, payload: yieldId })
}

export const getYieldBottleData = (yieldId) => async (dispatch) => {
  dispatch({ type: GET_YIELD_BOTTLE_DATA_REQUEST })
  const response = await performance.getYieldBottleData(yieldId)
  if (!response.ok) return dispatch({ type: GET_YIELD_BOTTLE_DATA_FAIL, payload: response.problem })
  const yieldBottleSummary = {
    totalDeltaMl: response.data.data.diferencia_total_ml,
    totalDeltaDrinks: response.data.data.diferencia_total_tragos
  }
  const yieldBottleData = response.data.data.botellas.map(item => {
    const bottleObj = {
      folio: item.folio,
      state: item.estado_botella,
      actualVolume: item.volumen_actual,
      pastVolume: item.volumen_anterior,
      deltaMl: item.diferencia_ml,
      deltaDrinks: item.diferencia_tragos 
    }
    return bottleObj
  })
  dispatch({ 
    type: GET_YIELD_BOTTLE_DATA_SUCCESS, 
    payload: { yieldBottleSummary, yieldBottleData }
  })
}

