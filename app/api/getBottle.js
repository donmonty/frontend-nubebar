import client from './client';

const endpoint = '/sat';

function getBottleId(qrCode) {
  return client.get(`${endpoint}/${qrCode}`)
}

export default {
  getBottleId,
}