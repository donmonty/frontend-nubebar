import stock from '../../api/stock'
import {
  STOCK_PRODUCT_LIST_REQUEST,
  STOCK_PRODUCT_LIST_SUCCESS,
  STOCK_PRODUCT_LIST_FAIL
} from '../constants/stockConstants'


export const getStockProductList = (locationId) => async (dispatch) => {
  dispatch({ type: STOCK_PRODUCT_LIST_REQUEST })
  const response = await stock.getStockProductList(locationId)
  if (!response.ok) return dispatch({ type: STOCK_PRODUCT_LIST_FAIL, payload: response.problem })
  const stockProductListSummary = {
    location: response.data.data.sucursal,
    date: response.data.data.fecha,
    totalQuantity: response.data.data.total_botellas.unidades__sum
  }
  const stockProductListData = response.data.data.botellas.map(item => {
    const bottle = {
      id: item.id,
      product: item.nombre_marca,
      category: item.ingrediente__categoria__nombre,
      quantity: item.unidades
    }
    return bottle
  })
  dispatch({ 
    type: STOCK_PRODUCT_LIST_SUCCESS, 
    payload: { stockProductListSummary, stockProductListData } 
  })
}