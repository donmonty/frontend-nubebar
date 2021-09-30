import client from "./client"
import authStorage from "../auth/storage"
import settings from "../config/settings"
import cache from "../utility/cache"

const endpoint = '/api'

async function addNewBottle(args) {
  const token = await authStorage.getToken()
  const sucursal = await cache.get('Sucursal')
  const almacen = await cache.get('Almacen')
  const proveedor = 1
  const url = '/inventarios/crear-botella-nueva'
  return client.post(endpoint + url, { ...args, sucursal, almacen, proveedor }, { headers: { 'Authorization': `${settings.tokenType} ${token}`} })
}


export default {
  addNewBottle,
}