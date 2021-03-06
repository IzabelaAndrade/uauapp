import moment from 'moment';
import api from '../services/api';

export async function getAllPurchaseOrder(user) {
  let response = null;
  try {
    response = await api.post('RotinasGerais/ExecutarConsultaGeral', {
      Id: '10',
      Personalizado: '1',
      Parameters: ['user', "'".concat(user, "'")],
    });
  } catch (error) {
    throw error;
  }
  return response;
}

export async function getOnePurchaseOrder(placeCode, requestNumber) {
  let response = null;
  try {
    response = await api.post('RotinasGerais/ExecutarConsultaGeral', {
      Id: '3',
      Personalizado: '1',
      Parameters: [
        'placeCode',
        "'".concat(placeCode, "'"),
        'requestNumber',
        "'".concat(requestNumber, "'"),
      ],
    });
  } catch (error) {
    throw error;
  }
  return response;
}

export async function addPurchaseOrder(
  place,
  login,
  products,
  deliveryForecast
) {
  const formatedproducts = products.map(element => {
    return {
      codigoInsumo: element.productCode,
      CAP: element.cap,
      unidade: element.unity,
      controleEstoque: 1,
      dataEntrega: moment(deliveryForecast, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      quantidade: element.originalQuantity,
      precoOrcado: 0,
      observacao: '',
      especificacao: '',
      codDepreciacao: '',
      listaVinculo: [
        {
          produtoPl: place.plannedProduct,
          contratoPl: place.plannedContract,
          itemPl: place.plannedItem,
          servicoPl: 'SP0002',
          mesPl: moment().format('MM/YYYY'),
          codigoInsumoPl: place.plannedInput,
          quantidadeVinculo: element.originalQuantity,
          numeroItemContrato: 1,
        },
      ],
    };
  });
  let response = null;
  try {
    response = await api.post(
      'PedidoCompra/GravarPedidoDeCompraDoTipoMaterial',
      {
        dadosPedido: {
          codigoEmpresa: '1',
          codigoObra: place.placeCode,
          considerarVinculoSemSaldoMes: true,
          codigoObraFiscal: place.placeCode,
          usuario: login,
          observacao: '',
        },
        listaDadosItemPedido: formatedproducts,
      }
    );
  } catch (error) {
    throw error;
  }
  return response.data;
}
