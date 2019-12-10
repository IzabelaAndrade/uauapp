import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import OrderTable from '../../components/OrderTable';

const data = {
  id: '1',
  number: '255',
  createat: '2019-12-03',
  author: 'Autor',
  place: 'Tribunal de Justiça',
  itens: [
    {
      id: '1',
      description: 'Luminária Redonda Ônix 127V 35cm x 100cm',
      unidade: 'Un',
      qtde: '03',
    },
    { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
    { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
    { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
  ],
};

export default function Order(props) {
  // const [orderList, setOrderList] = React.useState(tst);
  const orderData = props.navigation.state.params.data;
  console.log(orderData);

  const serverOrder = data;
  // console.log(serverOrder.itens);

  const date = moment(orderData.createat).format('DD MMM');

  function Header() {
    return (
      <>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: '400' }}>
            Pedido Nº {orderData.number}
          </Text>
          <Text style={{ fontWeight: '400', alignSelf: 'center' }}>{date}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              backgroundColor: '#f48024',
              width: 45,
              height: 45,
              borderRadius: 22.5,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: '400',
              }}
            >
              {orderData.author.charAt(0)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#222426',
                fontSize: 18,
              }}
            >
              {orderData.place}
            </Text>
            <Text
              style={{
                color: '#bcbbbb',
              }}
            >
              {orderData.author}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <OrderTable data={orderData.itens} enabled={false} />
    </View>
  );
}
