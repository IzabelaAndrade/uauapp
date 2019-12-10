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
    number: '255',
    createat: '2019-12-03',
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
      { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
      { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
      { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
    ],
  },
  {
    id: '2',
    number: '356',
    createat: '2019-12-03',
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

export default function Main() {
  // const [orderData, setOrderData] = React.useState(orderList);
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
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <FlatList
          data={orderList}
          renderItem={({ item }) => <OrderCard data={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      {/* <OrderCard
        data={orderData}
      /> */}

      {/* <View style={{
        padding: 5,
        // backgroundColor: '#bcbcbc',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },

      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: .5,
          borderColor: '#bcbcbc',
        }}>
          <View style={{ flexDirection: 'row' }}>

            <Text style={{ fontSize: 28, fontWeight: '400' }}>
              Pedido Nº 225
            </Text>

          </View>
          <View style={{}}>
            <Text style={{ fontWeight: '400', alignSelf: 'center' }}>
              24 Nov
            </Text>


          </View>
        </View>

        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Obra:
          <Text style={{ fontWeight: '600', color: '#000', fontSize: 16 }}>
            Tribunal de Justiça
          </Text>
        </Text>
        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Autor:
          <Text style={{ fontWeight: '600', color: '#000', fontSize: 16, }}>
            Marcos de Andrade
          </Text>
        </Text>
        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Previsão de Entrega:
          <Text style={{ fontWeight: '400', color: '#000', fontSize: 16 }}>
            30/11/2019
          </Text>
        </Text>


        <Text style={{ color: '#f9aa31', marginVertical: 5 }}> Tags: Elétrica, Alvenaria</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: .5,
          borderColor: '#bcbcbc',
        }}>
          <View style={{
            backgroundColor: '#F44336',
            paddingHorizontal: 10,
            paddingVertical: 2.5,
            borderRadius: 20
          }}>
            <Text style={{ color: '#fff' }}>
              Aguardando Cotação </Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{
              fontSize: 14, fontWeight: '600',
              color: '#f48024'
            }}>Ver Pedido</Text>
            <Feather name="chevron-down" size={20} color="#f48024"
              style={{ marginLeft: 10, }}
            />
          </View>
        </View>
      </View> */}

      {/* <View style={{
        padding: 5,
        // backgroundColor: '#bcbcbc',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },

      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: .5,
          borderColor: '#bcbcbc',
        }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28, fontWeight: '400' }}>
              Pedido Nº 273
          </Text>

          </View>
          <View style={{}}>
            <Text style={{ fontWeight: '400', alignSelf: 'center' }}>
              27 Nov
            </Text>

          </View>
        </View>

        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Obra:
          <Text style={{ fontWeight: '600', color: '#000', fontSize: 16 }}>
            Santa Casa da Misericórdia
          </Text>
        </Text>
        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Autor:
          <Text style={{ fontWeight: '600', color: '#000', fontSize: 16, }}>
            Willian César Nogueira Florencio
          </Text>
        </Text>
        <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
          Previsão de Entrega:
          <Text style={{ fontWeight: '400', color: '#000', fontSize: 16 }}>
            27/11/2019
          </Text>
        </Text>


        <Text style={{ color: '#f9aa31', marginVertical: 5 }}> Tags: Elétrica, Alvenaria</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: .5,
          borderColor: '#bcbcbc',
        }}>
          <View style={{
            backgroundColor: '#388E3C',
            paddingHorizontal: 10,
            paddingVertical: 2.5,
            borderRadius: 20
          }}>
            <Text style={{ color: '#fff' }}>
              Concluído </Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{
              fontSize: 14, fontWeight: '600',
              color: '#f48024'
            }}>Ver Pedido</Text>
            <Feather name="chevron-down" size={20} color="#f48024"
              style={{ marginLeft: 10, }}
            />
          </View>
        </View>
      </View> */}

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
          // this.props.navigation.navigate('Input');
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
