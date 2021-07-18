import getProduct from "../../api/getProduct"
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"


export const listProductDetails = (barcode) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST })
  const response = await getProduct.getProductByBarcode(barcode)
  if (!response.ok) return dispatch({ type: PRODUCT_DETAILS_FAIL, payload: response.problem })
  const data = response.data.body[0]
  dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
}
