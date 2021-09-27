import client from './client';

const endpoint = 'api/inventarios/get-lista-sucursales';

const getLocations = (token) => client.get(endpoint, { headers: { 'Authorization': `Bearer ${token}`} })


export default {
  getLocations,
}