import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

import PropTypes from 'prop-types';
import OrderCardStatus from '../OrderCardStatus';

const stylesOrderCard = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#bcbcbc',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
  },
  headerSubTitle: {
    fontWeight: '400',
    alignSelf: 'center',
    color: '#000',
  },
  contentLable: { color: '#bcbcbc', marginTop: 10 },
  contentValue: { fontWeight: '600', color: '#000', fontSize: 16 },
  contentQuantityOfItems: { color: '#f9aa31', marginVertical: 5 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: '#bcbcbc',
  },
  footerBtn: { flexDirection: 'row' },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f48024',
  },
  footerIcon: { marginLeft: 10 },
});

export default function OrderCard(props) {
  const {
    requestNumber,
    requestDate,
    place,
    author,
    deliveryForecast,
    quantityOfItems,
    status,
    onPressCard,
  } = props;
  return (
    <View style={stylesOrderCard.container}>
      <View style={stylesOrderCard.header}>
        <Text style={stylesOrderCard.headerTitle}>
          Pedido Nº {requestNumber}
        </Text>
        <Text style={stylesOrderCard.headerSubTitle}>
          {moment(requestDate, 'DD/MM/YYYY').format('DD MMM')}
        </Text>
      </View>

      <Text style={stylesOrderCard.contentLable}>
        Obra:{'\t'}
        <Text style={stylesOrderCard.contentValue}>{place}</Text>
      </Text>

      <Text style={stylesOrderCard.contentLable}>
        Autor:{'\t'}
        <Text style={stylesOrderCard.contentValue}>{author}</Text>
      </Text>
      <Text style={stylesOrderCard.contentLable}>
        Previsão de Entrega:{'\t'}
        <Text style={stylesOrderCard.headerSubTitle}>
          {deliveryForecast
            ? moment(deliveryForecast).format('DD/MM/YYYY')
            : 'Não informado'}
        </Text>
      </Text>

      <Text style={stylesOrderCard.contentQuantityOfItems}>
        {' '}
        Quantidade de Itens: {quantityOfItems}
      </Text>
      <View style={stylesOrderCard.footer}>
        <OrderCardStatus status={status} />

        <TouchableOpacity
          style={stylesOrderCard.footerBtn}
          onPress={onPressCard}
        >
          <Text style={stylesOrderCard.footerText}>Ver Pedido</Text>
          <Feather
            name="chevron-down"
            size={20}
            color="#f48024"
            style={stylesOrderCard.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

OrderCard.prototype = {
  data: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  requestNumber: PropTypes.string.isRequired,
  requestDate: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  deliveryForecast: PropTypes.string.isRequired,
  quoteNumber: PropTypes.string.isRequired,
};
