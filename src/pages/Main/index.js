import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from '../../store/modules/auth/actions';

import { getAllPurchaseOrder } from '../../controller/PurchaseOrderController';

import OrderCard from '../../components/OrderCard';

const { width, height } = Dimensions.get('window');

const stylesMain = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  btn: {
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
  },
});

export default function Main({ navigation }) {
  // const [orderData, setOrderData] = React.useState(orderList);
  const [orders, setOrders] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  function seeOrder(item) {
    navigation.navigate('Order', {
      data: item,
    });
  }

  useEffect(() => {
    async function loadPurchaseOrder() {
      let response = null;
      try {
        response = await getAllPurchaseOrder(user);
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(signOut());
          setRefresh(false);
          return;
        }
      }
      setOrders(response.data);
      setRefresh(false);
    }
    loadPurchaseOrder();
  }, [dispatch, navigation, user, refresh]);

  function handleRefresh() {
    setRefresh(true);
  }

  return (
    <>
      <SafeAreaView style={stylesMain.container}>
        <FlatList
          data={orders}
          keyExtractor={item => item.placeCode.concat(item.requestNumber)}
          refreshing={refresh}
          onRefresh={() => handleRefresh()}
          ListEmptyComponent={
            <View
              style={{
                height: height / 2,
                justifyContent: 'flex-end',
              }}
            >
              <ActivityIndicator size="large" color="#f48024" />
            </View>
          }
          renderItem={({ item }) => {
            return (
              <OrderCard
                id={item.requestNumber}
                requestNumber={item.requestNumber}
                place={item.place}
                author={item.author}
                requestDate={item.requestDate}
                deliveryForecast={item.deliveryForecast}
                status={item.status}
                quantityOfItems={item.quantityOfItems}
                numberOfExcluded={item.numberOfExcluded}
                quantityDelivery={item.quantityDelivery}
                onPressCard={() => seeOrder(item)}
              />
            );
          }}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={stylesMain.btn}
        onPress={() => {
          navigation.navigate('CreateOrder');
        }}
      >
        <AntDesign name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </>
  );
}
