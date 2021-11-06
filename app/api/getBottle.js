import client from './client';
import settings from "../config/settings"

const endpoint = '/sat';

function getBottleId(qrCode) {
  return client.get(`${endpoint}/${qrCode}`)
}

export default {
  getBottleId,
}