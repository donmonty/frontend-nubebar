import client from './client'
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api/analytics'


async function createYieldReport(args) {
  const token = await authStorage.getToken()
  const url = '/crear-reporte-mermas/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.post(`${endpoint}${url}`, { ...args })
}

async function getYieldReport(reportId) {
  const token = await authStorage.getToken()
  const url = '/get-reporte-mermas/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}reporte/${reportId}/`)
}

async function getYieldReports(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-reportes-mermas/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}almacen/${storageAreaId}`)
}

async function getYieldSalesData(yieldId) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-ventas-merma/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}merma/${yieldId}/`)
}

async function getYieldBottleData(yieldId) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-botellas-merma/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}merma/${yieldId}/`)
}


export default {
  createYieldReport,
  getYieldReport,
  getYieldReports,
  getYieldSalesData,
  getYieldBottleData,
}