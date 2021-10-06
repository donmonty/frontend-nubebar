import client from './client';
import authStorage from "../auth/storage"

const endpoint = '/api';

async function getQuickCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-lista-inspecciones/'
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/DIARIA/`, { headers: { 'Authorization': `Bearer ${token}`} });
}

async function getTotalCounts(storageAreaId) {
  const token = await authStorage.getToken()
  const url = '/inventarios/get-lista-inspecciones/';
  return client.get(`${endpoint}${url}almacen/${storageAreaId}/tipo/TOTAL/`, { headers: { 'Authorization': `Bearer ${token}`} });
}

export default {
  getQuickCounts,
  getTotalCounts,
}