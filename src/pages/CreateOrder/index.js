import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
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

function Header({ navigation, onPress, btn }) {
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
          disabled={btn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather
            name="chevron-left"
            size={30}
            color={btn ? 'rgba(255,255,255,.3)' : '#fff'}
          />
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
          disabled={btn}
          onPress={() => onPress()}
        >
          <Text
            style={{
              color: btn ? 'rgba(255,255,255,.3)' : '#fff',
              fontWeight: '500',
            }}
          >
            {' '}
            Salvar{' '}
          </Text>
          <AntDesign
            name="save"
            size={20}
            color={btn ? 'rgba(255,255,255,.3)' : '#fff'}
          />
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
  const [orderList, setOrderList] = React.useState([]);
  const [validDate, setValidDate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(state => state.auth.user);

  const moment = require('moment');

  useEffect(() => {
    async function loadPurchaseOrder() {
      let products = null;
      let places = null;
      try {
        products = await getAllProtucts();
      } catch (error) {
        // if (error.response.status === 401) {
        //   // dispatch(signOut());
        // }
      }
      try {
        places = await getAllPlaces(user);
      } catch (error) {}
      setListProducts(products);
      setPlace(places.data);
    }
    loadPurchaseOrder();
  }, [user]);

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
      setValidDate(true);
    } else {
      setValidDate(false);
      return Alert.alert('A data informada é inválida.');
    }
  }

  function handleAddTable() {
    if (!choiceItem || !amount) return;
    if (
      orderList &&
      orderList.some(elem => elem.productCode === selectedItem.productCode)
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
      },

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
    if (!choicePlace)
      return Alert.alert('Selecione uma Obra para esse pedido.');
    if (!validDate) return Alert.alert('A data informada é inválida.');
    if (orderList == '') return Alert.alert('O pedido não contém itens.');
    setLoading(true);
    let response = null;
    try {
      response = await addPurchaseOrder(
        choicePlace,
        user,
        orderList,
        deliveryDate
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      // if (error.response.status === 401) {
      //   dispatch(signOut());
      // }
    }
    setLoading(false);
    console.log(response);
    Alert.alert('Seu pedido foi criado com sucesso.', '', [
      {
        text: 'OK',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <View style={stylesCreateOrder.container}>
      {loading ? (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Header navigation={navigation} onPress={createNewOrder} btn />
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <ActivityIndicator size="large" color="#f48024" />
          </View>
        </View>
      ) : (
        <>
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
              onPressItem={item => handleRemoveTable(item)}
              remove
            />
          </View>
        </>
      )}
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
