import client from './client';
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api';

async function getProductByBarcode(barcode) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-producto/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(endpoint + url + barcode);
}
  

export default {
  getProductByBarcode,
}