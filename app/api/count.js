import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api/inventarios';

async function getQuickCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/'
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/DIARIA/`, { headers: { 'Authorization': `Bearer ${token}`} });
}

async function getTotalCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/get-lista-inspecciones/';
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/TOTAL/`, { headers: { 'Authorization': `Bearer ${token}`} });
}

async function createQuickCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  return client.post(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `Bearer ${token}`}})
}

async function createTotalCount(args) {
  const token = await authStorage.getToken()
  const url = '/inspeccion-total/'
  return client.post(`${endpoint}${url}`, { ...args }, { headers: { 'Authorization': `Bearer ${token}`}})
}

export default {
  getQuickCounts,
  getTotalCounts,
  createQuickCount,
  createTotalCount,
}