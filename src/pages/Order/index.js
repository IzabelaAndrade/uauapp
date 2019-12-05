import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import { AntDesign, Feather } from '@expo/vector-icons';

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

export default function Order() {
  // const [orderList, setOrderList] = React.useState(tst);
  const serverOrder = data;
  console.log(serverOrder.itens);
  const date = moment(serverOrder.createat).format('DD MMM');

  function Header(props) {
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
            Pedido Nº {props.serverOrder.number}
          </Text>
          <Text style={{ fontWeight: '400', alignSelf: 'center' }}>
            {props.date}
          </Text>
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
              {props.serverOrder.author.charAt(0)}
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
              {props.serverOrder.place}
            </Text>
            <Text
              style={{
                color: '#bcbbbb',
              }}
            >
              {props.serverOrder.author}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header date={date} serverOrder={serverOrder} />
      <OrderTable data={data.itens} enabled={false} />
    </View>
  );
}
