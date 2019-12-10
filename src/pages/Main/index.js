import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { getPurchaseOrder } from '../../controller/PurchaseOrderController';

import OrderCard from '../../components/OrderCard';
// import { Container } from './styles';
const { width, height } = Dimensions.get('window');

const orderList = [
  {
    id: '1',
    number: '372',
    createat: '2019-12-06',
    finalDate: '2019-12-13',
    author: 'Autor',
    place: 'Tribunal de Justiça',
    status: 'Aguardando Cotação',
    tags: 'Elétrica, Alvenaria',
    itens: [
      {
        id: '1',
        description: 'Luminária Redonda Ônix 127V 35cm x 100cm',
        unidade: 'Un',
        qtde: '03',
      },
      { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
      { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
      { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
    ],
  },
  {
    id: '2',
    number: '356',
    createat: '2019-12-03',
    finalDate: '2019-12-11',
    author: 'Marcos de Andrade',
    place: 'Santa Casa da Misericórdia',
    status: 'Em Cotação',
    tags: 'Elétrica, Alvenaria',
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
  },
];

export default function Main({ navigation }) {
  // const [orderData, setOrderData] = React.useState(orderList);
<<<<<<< HEAD
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    const places = ['ALMOX'];
    async function loadPurchaseOrder() {
      let response = null;
      try {
        response = await getPurchaseOrder(places);
      } catch (error) {
        console.log(error);
      }
      setOrders(response);
    }
    loadPurchaseOrder();
  }, []);
=======

  function seeOrder(item) {
    navigation.navigate('Order', {
      data: item,
    });
  }

>>>>>>> 27915cb59c496b5467b5cc273d7cff033c69b0c8
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <FlatList
          data={orderList}
          renderItem={({ item }) => (
            <OrderCard data={item} onPress={pressItem => seeOrder(pressItem)} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          backgroundColor: '#f48024',
          borderRadius: 30,
          position: 'absolute',
          top: height - 150,
          left: width - 85,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 3 },
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('CreateOrder');
        }}
      >
        <AntDesign name="plus" size={32} color="#fff" style={{}} />
      </TouchableOpacity>
    </View>
  );
}

Main.navigationOptions = {
  title: 'Pedidos',
};
