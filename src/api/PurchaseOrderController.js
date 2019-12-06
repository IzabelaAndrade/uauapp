import APIKEY from './constants';
import axios from '../utils/axios';

export const getPurchaseOrder = async (places, token) => {
  const companyAndPlace = places.map(place => {
    return `1|${place}`;
  });
  let response = null;
  try {
    response = await axios.post(
      'RotinasGerais/ExecutarConsultaGeral',
      {
        Id: '3',
        Personalizado: '1',
        Parameters: ['EmpresaObra', "'".concat(companyAndPlace.join(','), "'")],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': APIKEY,
          Authorization: token,
        },
      }
    );
  } catch (error) {
    throw error;
  }
  const orders = {};
  response.data.map(element => {
    console.log('orders[element.CodObra]');
    console.log(orders[element.CodObra]);
    if (
      !Object.prototype.toString.call(orders[element.CodObra]) ===
      '[object Object]'
    ) {
      orders[element.CodObra] = {};
      console.log('add object in orders[element.CodObra]');
      console.log(orders[element.CodObra]);
      if (!Array.isArray(orders[element.CodObra][element.Pedido])) {
        orders[element.CodObra][element.Pedido] = [];
      }
    }
    orders[element.CodObra][element.order].push({
      placeCode: element.CodObra,
      place: element.Obra,
      order: element.Pedido,
      quote: element['Cotação'],
      productCode: element.CodIns,
      product: element.Insumo,
      amount: element.QtdPedido,
    });
    return 0;
  });

  console.log(orders);

  return null;
};
