import client from './client';
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api';

async function getStorageAreas(locationId) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-almacenes/sucursal/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(endpoint + url + locationId);
}
  

export default {
  getStorageAreas,
}