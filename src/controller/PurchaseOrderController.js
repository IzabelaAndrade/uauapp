import api from '../services/api';

function orderOwnerByPurchaseNumber(owners) {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of owners) {
    if (
      Object.prototype.toString.call(result[item.Obra_ped]) ===
      '[object Undefined]'
    ) {
      result[item.Obra_ped] = {};
    }
    if (
      Object.prototype.toString.call(result[item.Obra_ped][item.cod_ped]) ===
      '[object Undefined]'
    ) {
      result[item.Obra_ped][item.cod_ped] = '';
    }
    result[item.Obra_ped][item.cod_ped] = item.Quem_ped;
  }
  return result;
}

function formatOrder(purchase, owners) {
  const ownersFormated = orderOwnerByPurchaseNumber(owners);
  const orders = {};
  const ordersFormated = [];
  purchase.map(element => {
    if (
      Object.prototype.toString.call(orders[element.CodObra]) ===
      '[object Undefined]'
    ) {
      orders[element.CodObra] = {};
    }
    if (
      Object.prototype.toString.call(
        orders[element.CodObra][element.Pedido]
      ) === '[object Undefined]'
    ) {
      orders[element.CodObra][element.Pedido] = [];
    }
    orders[element.CodObra][element.Pedido].push({
      placeCode: element.CodObra,
      place: element.Obra,
      order: element.Pedido,
      quote: element['Cotação'],
      productCode: element.CodIns,
      product: element.Insumo,
      amount: element.QtdPedido,
      orderConfirmation: element['Data Confirmacao do Pedido'],
      deliveryDate: element.DataEntrega,
      stage: element.Estagio,
      requestDate: element.DataPedido,
    });
    return 0;
  });

  const keysPlace = Object.keys(orders);
  keysPlace.forEach((keyPlace, indexPlace) => {
    const keysOrer = Object.keys(orders[keyPlace]);
    keysOrer.forEach((keyOrder, indexOrder) => {
      ordersFormated.push({
        id: indexPlace.toString().concat(indexOrder.toString()),
        number: orders[keyPlace][keyOrder][0].order,
        createat: orders[keyPlace][keyOrder][0].requestDate,
        author:
          ownersFormated[orders[keyPlace][keyOrder][0].placeCode][
            orders[keyPlace][keyOrder][0].order
          ],
        place: orders[keyPlace][keyOrder][0].place,
        status: orders[keyPlace][keyOrder][0].stage,
        quoteNumber: orders[keyPlace][keyOrder][0].quote,
        products: orders[keyPlace][keyOrder],
      });
    });
  });
  return ordersFormated;
}

export const getPurchaseOrder = async places => {
  const companyAndPlace = places.map(place => {
    return `1|${place}`;
  });
  let orderInquiry = null;
  try {
    orderInquiry = await api.post('RotinasGerais/ExecutarConsultaGeral', {
      Id: '3',
      Personalizado: '1',
      Parameters: ['EmpresaObra', "'".concat(companyAndPlace.join(','), "'")],
    });
  } catch (error) {
    throw error;
  }
  let responsibleConsultation = null;
  try {
    responsibleConsultation = await api.post(
      'RotinasGerais/ExecutarConsultaGeral',
      {
        Id: '5',
        Personalizado: '1',
        Parameters: [],
      }
    );
  } catch (error) {
    throw error;
  }

  return formatOrder(orderInquiry.data, responsibleConsultation.data);
};
