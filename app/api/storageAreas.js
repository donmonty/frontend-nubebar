import client from './client';

const endpoint = '/location';

function getStorageAreas(locationId) {
  const url = '/storage';
  return client.get(endpoint + url, { id: locationId });
}
  

export default {
  getStorageAreas,
}