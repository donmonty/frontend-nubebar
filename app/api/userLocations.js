import client from './client';

const endpoint = '/usuario/locations';

const getLocations = (userId) => client.get(endpoint, { id: userId });
  


export default {
  getLocations,
}