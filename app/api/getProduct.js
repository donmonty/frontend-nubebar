import client from './client';

const endpoint = '/inventario';

function getProductByBarcode(barcode) {
  const url = '/producto';
  return client.get(endpoint + url, { codigo_barras: barcode });
}
  

export default {
  getProductByBarcode,
}