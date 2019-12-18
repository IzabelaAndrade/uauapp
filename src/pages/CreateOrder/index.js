import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

import Date from '../../utils/Date';

import { getAllProtucts } from '../../controller/ProductsController';
import { getAllPlaces } from '../../controller/PlacesController';
import { addPurchaseOrder } from '../../controller/PurchaseOrderController';

import HeaderOrderTable from '../../components/HeaderOrderTable';
import InsertTable from '../../components/InsertTable';
import OrderTable from '../../components/OrderTable';

const stylesCreateOrder = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  boxTable: {
    marginTop: 10,
    borderTopWidth: 0.5,
    flex: 1,
    borderColor: '#bcbcbc',
  },
});

const serverListPlaces = [
  { id: '1', name: 'Tribunal de Justiça' },
  { id: '2', name: 'Secretaria de Saúde' },
  { id: '3', name: 'Santa Casa da Misericórdia' },
  { id: '4', name: 'Detran' },
];

function Header({ navigation, onPress }) {
  return (
    <View
      style={{
        backgroundColor: '#f48024',
        height: Constants.statusBarHeight + 45,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: Constants.statusBarHeight,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            height: 45,
            width: 75,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 5,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              fontSize: 18,
              alignSelf: 'center',
            }}
          >
            Novo Pedido
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onPress()}
        >
          <Text style={{ color: '#fff', fontWeight: '500' }}> Salvar </Text>
          <AntDesign name="save" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const sendCreateOrder = () => {};

export default function CreateOrder({ navigation }) {
  const [amount, setAmount] = React.useState('');
  const [deliveryDate, setDeliveryDate] = React.useState('');
  const [visible, setModalVisible] = React.useState(false);
  const [visiblePlaces, setVisiblePlaces] = React.useState(false);
  const [choiceItem, setChoiceItem] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState('');
  const [choicePlace, setChoicePlace] = React.useState('');
  const [places, setPlace] = React.useState('');
  const [listProducts, setListProducts] = React.useState('');
  const [orderList, setOrderList] = React.useState('');
  const user = useSelector(state => state.auth.user);

  const moment = require('moment');

  // navigation.setOptions({
  //   title: 'Pedido Detalhado',
  //   headerRight: () => (
  //     <TouchableOpacity
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //       }}
  //       // onPress={}
  //     >
  //       <Text style={{ color: '#fff', fontWeight: '500' }}> Salvar </Text>
  //       <AntDesign name="save" size={20} color="#fff" />
  //     </TouchableOpacity>
  //   ),
  // });

  useEffect(() => {
    async function loadPurchaseOrder() {
      let products = null;
      let places = null;
      try {
        products = await getAllProtucts();
      } catch (error) {
        console.log(error);
        // if (error.response.status === 401) {
        //   // dispatch(signOut());
        // }
      }
      try {
        places = await getAllPlaces();
      } catch (error) {
        console.log(error);
      }
      setListProducts(products);
      setPlace(places);
    }
    loadPurchaseOrder();
  }, []);

  const getItem = item => {
    if (item) {
      setChoiceItem(item.product);
      setSelectedItem(item);
    }
    setModalVisible(!visible);
  };

  const getPlaces = item => {
    if (item) {
      setChoicePlace(item);
    }
    setVisiblePlaces(!visiblePlaces);
  };

  function getDeliveryDate(date) {
    const d = Date.format(date);
    setDeliveryDate(d);
  }

  function validadteDate() {
    let minDate = false;
    const valide = moment(deliveryDate, 'DD/MM/YYYY').isValid();
    if (valide) {
      minDate = moment().isSameOrBefore(
        moment(deliveryDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
      );
    }
    const size = deliveryDate.length == 10;
    if (valide && size && minDate) {
      console.log(true);
      return;
    }
    console.log(false);
  }

  function handleAddTable() {
    if (!choiceItem || !amount) return;
    if (
      orderList &&
      orderList.some(elem => elem.productCode === selectedItem.Codigo)
    ) {
      Alert.alert('O item selecionado já foi adicionado ao pedido');
      return;
    }
    setOrderList([
      {
        cap: selectedItem.cap,
        productCode: selectedItem.productCode,
        product: selectedItem.product,
        unity: selectedItem.unity,
        originalQuantity: amount,
        // DataCadastro: selectedItem.DataCadastro,
        // QuemCadastrou: selectedItem.QuemCadastrou,
        // CAP: selectedItem.CAP,
        // Codigo: selectedItem.Codigo,
        // DataCadastro: selectedItem.DataCadastro,
        // Descrição: selectedItem.Descrição,
        // QuemCadastrou: selectedItem.QuemCadastrou,
        // Und: selectedItem.Und,
        // amount,

        // productCode: `${Math.random()}`,
        // product: choiceItem,
        // unidade: 'Un',
        // amount: amount < 10 ? `0${amount.toString()}` : amount.toString(),
      },

      // {
      //   productCode: `${Math.random()}`,
      //   product: choiceItem,
      //   unidade: 'Un',
      //   amount: amount < 10 ? `0${amount.toString()}` : amount.toString(),
      // },
      ...orderList,
    ]);
    setAmount('');
    setChoiceItem('');
    setSelectedItem('');
  }

  function handleRemoveTable(item) {
    const orderListUpdate = orderList.filter(element => {
      if (element.productCode === item.productCode) return false;
      return true;
    });
    setOrderList(orderListUpdate);
  }

  async function createNewOrder() {
    console.log('onPreeeeess');
    console.log(choicePlace.Cod_obr);
    console.log(deliveryDate);
    console.log(user);
    console.log(orderList);

    // let response = null;
    // try {
    //   response = await addPurchaseOrder(orderData.placeCode, user, orderList);
    // } catch (error) {
    //   if (error.response.status === 401) {
    //     dispatch(signOut());
    //   }
    // }
  }

  return (
    <View style={stylesCreateOrder.container}>
      <Header navigation={navigation} onPress={createNewOrder} />
      <HeaderOrderTable
        value={deliveryDate}
        onChangeText={text => getDeliveryDate(text)}
        onEndEditing={() => validadteDate()}
        data={places}
        visible={visiblePlaces}
        onPress={() => getPlaces('')}
        onSelectPlace={item => getPlaces(item)}
        choicePlace={choicePlace}
      />

      <View style={stylesCreateOrder.boxTable}>
        <InsertTable
          onPress={() => getItem('')}
          visible={visible}
          data={listProducts}
          onSelect={item => getItem(item)}
          choiceItem={choiceItem}
          onChangeText={text => setAmount(text)}
          amount={amount}
          onInsert={handleAddTable}
        />

        <OrderTable
          data={orderList}
          enabled
          onDelete={item => handleRemoveTable(item)}
        />
      </View>
    </View>
  );
}

// CreateOrder.navigationOptions = screenProps => ({
//   title: 'Pedido Detalhado',
//   headerRight: () => (
//     <TouchableOpacity
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}
//       onPress={}
//     >
//       <Text style={{ color: '#fff', fontWeight: '500' }}> Salvar </Text>
//       <AntDesign name="save" size={20} color="#fff" />
//     </TouchableOpacity>
//   ),
// });
