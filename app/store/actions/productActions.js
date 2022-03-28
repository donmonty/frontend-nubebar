import getProduct from "../../api/getProduct"
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"

const PRODUCT_ERROR = "Esta marca no está registrada. Por favor contacta a soporte."
const STANDARD_ERROR = "Hubo un error. Intenta de nuevo."

export const listProductDetails = (barcode) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST })
  const response = await getProduct.getProductByBarcode(barcode)
  if (!response.ok) {
    console.log("//// originalError:", response.originalError);
    if (response.problem === "CLIENT_ERROR") return dispatch({ type: PRODUCT_DETAILS_FAIL, payload: PRODUCT_ERROR})
    return dispatch({ type: PRODUCT_DETAILS_FAIL, payload: STANDARD_ERROR })
  }
  const data = response.data.data
  dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
}
