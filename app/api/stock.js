import client from './client';
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api/analytics'


async function getStockProductList(locationId) {
  const token = await authStorage.getToken()
  const url = '/get-reporte-stock/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}/sucursal/${locationId}`)
}

async function getStockProductBottleList(productId, locationId) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-stock/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}/producto/${productId}/sucursal/${locationId}`)
}


export default {
  getStockProductList,
  getStockProductBottleList,
}