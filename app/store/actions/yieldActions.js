import yield from "../../api/yield"

import {
  GET_YIELD_REPORT_REQUEST,
  GET_YIELD_REPORT_SUCCESS,
  GET_YIELD_REPORT_FAIL,
} from "../constants/yieldConstants"


export const getYieldReport = (args) => async (dispatch) => {
  dispatch({ type: GET_YIELD_REPORT_REQUEST })
  const response = await yield.getYieldReport(args)
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
  dispatch({ type: GET_YIELD_REPORT_SUCCESS, payload: { reportData, yieldData } })
}

