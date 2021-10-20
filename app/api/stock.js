import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api/analytics';
const TOKEN_TYPE = 'Bearer'


async function getStockProductList(locationId) {
  const token = await authStorage.getToken()
  const url = '/get-reporte-stock/'
  return client.get(`${endpoint}${url}/sucursal/${locationId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getStockProductBottleList(productId, locationId) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-stock/'
  return client.get(`${endpoint}${url}/producto/${productId}/sucursal/${locationId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}


export default {
  getStockProductList,
  getStockProductBottleList,
}