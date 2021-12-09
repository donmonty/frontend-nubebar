import client from './client';
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api/inventarios';

async function getProductByBarcode(barcode) {
  const token = await authStorage.getToken()
  const url = '/get-producto/barcode/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}${barcode}`)
}
  

export default {
  getProductByBarcode,
}