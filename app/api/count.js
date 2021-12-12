import client from './client';
import authStorage from "../auth/storage"
import settings from "../config/settings"

const endpoint = '/api/inventarios'
function replaceTxt(hash, search, replace) { 
  return hash.split(search).join(replace)
}


async function getQuickCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/0`);
}

async function getTotalCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/1`);
}

async function createQuickCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.post(`${endpoint}${url}`, { ...args })
}

async function createTotalCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.post(`${endpoint}${url}`, { ...args })
}

async function getCountSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-botellas-conteo/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}inspeccion/${countId}`)
}

async function getBottleCountDetails(countId, qrCode) {
  const token = await authStorage.getToken()
  const url = '/get-detalle-botella-inspeccion-post/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  const encodedHash = replaceTxt(qrCode, "/", "_")
  return client.post(`${endpoint}${url}`, { inspeccion_id: countId, sat_hash: encodedHash })
}

async function getBottleDetails(qrCode) {
  const token = await authStorage.getToken()
  const url = '/consultar-botella/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  const encodedHash = replaceTxt(qrCode, "/", "_")
  return client.post(`${endpoint}${url}`, { sat_hash: encodedHash }) 
}

async function updateBottleWeight(args) {
  const token = await authStorage.getToken()
  const url = '/update-peso-botella/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.patch(`${endpoint}${url}`, { ...args })
}

async function updateBottleState(args) {
  const token = await authStorage.getToken()
  const url = '/update-botella-nueva-vacia/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.patch(`${endpoint}${url}`, { ...args })
}

async function getCountPendingSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-inspeccion-no-contado/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}inspeccion/${countId}`)
}

async function getCountDoneSummary(countId) {
  const token = await authStorage.getToken()
  const url = '/get-resumen-inspeccion-contado/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}inspeccion/${countId}`)
}

async function getPendingBottles(countId, product) {
  const token = await authStorage.getToken()
  const url = '/get-botellas-no-contadas/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}inspeccion/${countId}/ingrediente/${product}`)
}

async function getDoneBottles(countId, product) {
  const token = await authStorage.getToken()
  const url = '/get-botellas-contadas/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}inspeccion/${countId}/ingrediente/${product}`)
}

async function getBottleCounts(sat_hash) {
  const token = await authStorage.getToken()
  const url = '/get-inspecciones-botella/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.get(`${endpoint}${url}sat_hash/${encodeURIComponent(sat_hash)}`)
}

async function closeCount(args) {
  const token = await authStorage.getToken()
  const url = '/cerrar-inspeccion/'
  client.setHeader('Authorization', `${settings.tokenType} ${token}`)
  return client.patch(`${endpoint}${url}`, { ...args })
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