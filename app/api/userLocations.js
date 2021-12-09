import client from './client'
import authStorage from "../auth/storage"
import settings from "../config/settings"


const endpoint = 'api/inventarios/get-lista-sucursales';

async function getLocations() {
  const token = await authStorage.getToken()
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(endpoint)
}


export default {
  getLocations,
}