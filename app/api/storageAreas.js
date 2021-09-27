import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api';

async function getStorageAreas(locationId) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-almacenes/';
  return client.get(endpoint + url + locationId, { headers: { 'Authorization': `Bearer ${token}`} });
}
  

export default {
  getStorageAreas,
}