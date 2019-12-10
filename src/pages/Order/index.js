import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import OrderTable from '../../components/OrderTable';

const stylesOrder = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 28, fontWeight: '400' },
  meta: { flexDirection: 'row' },
  metaDate: { fontWeight: '400', alignSelf: 'center' },
  metaIcon: {
    backgroundColor: '#f48024',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaIconText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '400',
  },
  metaPlace: {
    color: '#222426',
    fontSize: 18,
  },
  metaAuthor: {
    color: '#bcbbbb',
  },
});

export default function Order(props) {
  // const [orderList, setOrderList] = React.useState(tst);
  const orderData = props.navigation.state.params.data;

  const date = moment(orderData.createat).format('DD MMM');

  function Header() {
    return (
      <>
        <View style={stylesOrder.header}>
          <Text style={stylesOrder.headerTitle}>
            Pedido Nº {orderData.number}
          </Text>
          <Text style={stylesOrder.metaDate}>{date}</Text>
        </View>

        <View style={stylesOrder.meta}>
          <View style={stylesOrder.metaIcon}>
            <Text style={stylesOrder.metaIconText}>
              {orderData.author.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={stylesOrder.metaPlace}>{orderData.place}</Text>
            <Text style={stylesOrder.metaAuthor}>{orderData.author}</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={stylesOrder.container}>
      <Header />
      <OrderTable data={orderData.itens} enabled={false} />
    </View>
  );
}
