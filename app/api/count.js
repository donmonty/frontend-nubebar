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

async function updateBottleWeight(args) {
  const token = await authStorage.getToken()
  const url = '/update-peso-botella/'
  return client.patch(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`}})
}

async function updateBottleState(args) {
  const token = await authStorage.getToken()
  const url = '/update-botella-nueva-vacia/'
  return client.patch(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`}})
}

async function getCountPendingSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-inspeccion-no-contado/'
  return client.get(`${endpoint}${url}/inspeccion/${countId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getCountDoneSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-inspeccion-contado/'
  return client.get(`${endpoint}${url}/inspeccion/${countId}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getPendingBottles(countId, product) {
  const token = await authStorage.getToken()
  const url = '/get-botellas-no-contadas/'
  return client.get(`${endpoint}${url}/inspeccion/${countId}/ingrediente/${product}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getDoneBottles(countId, product) {
  const token = await authStorage.getToken()
  const url = '/get-botellas-contadas/'
  return client.get(`${endpoint}${url}/inspeccion/${countId}/ingrediente/${product}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function getBottleCounts(sat_hash) {
  const token = await authStorage.getToken()
  const url = '/get-inspecciones-botella/'
  return client.get(`${endpoint}${url}/folio/${sat_hash}`, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}

async function closeCount(args) {
  const token = await authStorage.getToken()
  const url = '/cerrar-inspeccion/'
  return client.patch(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `${TOKEN_TYPE} ${token}`} })
}


export default {
  getQuickCounts,
  getTotalCounts,
  createQuickCount,
  createTotalCount,
  getCountSummary,
  getBottleCountDetails,
  getBottleDetails,
  updateBottleWeight,
  updateBottleState,
  getCountPendingSummary,
  getCountDoneSummary,
  getPendingBottles,
  getDoneBottles,
  getBottleCounts,
  closeCount,
}