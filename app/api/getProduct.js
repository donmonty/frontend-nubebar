import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api';

async function getProductByBarcode(barcode) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-producto/';
  return client.get(endpoint + url + barcode, { headers: { 'Authorization': `Bearer ${token}`} });
}
  

export default {
  getProductByBarcode,
}