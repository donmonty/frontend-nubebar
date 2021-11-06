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
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.post(endpoint + url, { ...args, sucursal, almacen, proveedor })
}

async function addUsedBottle(args) {
  const token = await authStorage.getToken()
  const sucursal = await cache.get('Sucursal')
  const almacen = await cache.get('Almacen')
  const proveedor = 1
  const url = '/inventarios/crear-botella-usada'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.post(endpoint + url, { ...args, sucursal, almacen, proveedor })
}


export default {
  addNewBottle,
  addUsedBottle,
}