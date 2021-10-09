import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api/inventarios';
const TOKEN_TYPE = 'Bearer'

async function getQuickCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/'
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/DIARIA/`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} });
}

async function getTotalCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/';
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/TOTAL/`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} });
}

async function createQuickCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  return client.post(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`}})
}

async function createTotalCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  return client.post(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`}})
}

async function getCountSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-botellas-conteo/'
  return client.get(`${endpoint}${url}inspeccion/${countId}/`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getBottleCountDetails(countId, qrCode) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-botella-inspeccion/'
  return client.get(`${endpoint}${url}/inspeccion/${countId}/folio/${qrCode}/`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getBottleDetails(qrCode) {
  const token = await authStorage.getToken()
  const url = '/consultar-botella/'
  return client.get(`${endpoint}${url}/folio/${qrCode}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} }) 
}

export default {
  getQuickCounts,
  getTotalCounts,
  createQuickCount,
  createTotalCount,
  getCountSummary,
  getBottleCountDetails,
  getBottleDetails,
}