import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api/analytics';
const TOKEN_TYPE = 'Bearer'


async function createYieldReport(args) {
  const token = await authStorage.getToken()
  const url = '/crear-reporte-mermas/'
  return client.post(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getYieldReport(reportId) {
  const token = await authStorage.getToken()
  const url = '/get-reporte-mermas/'
  return client.get(`${endpoint}${url}/reporte/${reportId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getYieldReports(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-reportes-mermas/'
  return client.get(`${endpoint}${url}/almacen/${storageAreaId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getYieldSalesData(yieldId) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-ventas-merma/'
  return client.get(`${endpoint}${url}/merma/${yieldId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}


export default {
  createYieldReport,
  getYieldReport,
  getYieldReports,
  getYieldSalesData,
}