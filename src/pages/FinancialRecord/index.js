import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import moment from 'moment';

import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import ContentLoader, {
  Rect,
  Circle,
  Facebook,
} from 'react-content-loader/native';
import api from '../../services/api';

// import { Container } from './styles';

const { width } = Dimensions.get('window');

function RecordItem({ data, loading, onPress }) {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        marginVertical: 5,
        borderBottomWidth: 0.5,
        borderColor: '#eeeeee',
        paddingBottom: 10,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>
            {data.user_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '400', flex: 1 }}>
            {data.type}
            {data.description ? (
              <Text style={{ color: '#737373' }}> - {data.description}</Text>
            ) : null}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>
            R$ {data.value}
          </Text>
        </View>
        <Text style={{ fontSize: 13, fontWeight: '400', color: '#cdcdcd' }}>
          Data: {moment(data.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onPress()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fc0e0e" />
          ) : (
            <FontAwesome name="trash-o" size={25} color="#fc0e0e" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Header({ navigation, onPress }) {
  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#FFF',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{ width: 35, alignItems: 'flex-end' }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={28} color="#f48024" />
      </TouchableOpacity>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        Lista de Entrevistados
      </Text>
      <TouchableOpacity
        style={{ width: 35, alignItems: 'flex-end' }}
        onPress={onPress}
      >
        <AntDesign name="filter" size={28} color="#f48024" />
      </TouchableOpacity>
    </View>
  );
}

function Filter({ value, onChangeText, onPressClear }) {
  return (
    <View style={{}}>
      {/* <Text
      style={{ marginHorizontal: 15, color: '#f48024', fontWeight: '500' }}
    >
      {filter.length < 1 ? '' : filter.join(', ')}
    </Text> */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          paddingHorizontal: 10,
          backgroundColor: 'rgba(0,0,0,.06)',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <AntDesign
          name="search1"
          size={25}
          color="#8b8b8b"
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          placeholder="Ex: João da Silva"
          underlineColorAndroid="transparent"
          style={{ flex: 1, fontSize: 19, height: 50 }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        {/* {value ? ( */}
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          onPress={onPressClear}
        >
          <AntDesign
            name="closecircleo"
            size={15}
            color="#8b8b8b"
            style={{ paddingRight: 10 }}
          />
        </TouchableOpacity>
        {/* ) : null} */}
      </View>
    </View>
  );
}

function FildDate() {
  return (
    <View style={{ paddingHorizontal: 10, flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '400' }}>Inicial: </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AntDesign
          name="calendar"
          size={22}
          color="#f48024"
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            alignItems: 'flex-end',
          }}
          onChangeText={text => onChangeText(text)}
          value="01/03/2020"
        />
      </View>
    </View>
  );
}

function ModalFilters(props) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.visible}
      onRequestClose={() => {}}
    >
      <View
        style={{ flex: 1, backgroundColor: '#fff', marginTop: 25, paddin: 10 }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5 }}>
            Data de Lançamento
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FildDate />
            <FildDate />
          </View>

          <TouchableOpacity
            style={{ backgroundColor: '#2196F3' }}
            onPress={props.onPressDone}
          >
            <Text style={{}}>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function filterList(text, list, filter) {
  if (text === '') return list;
  const re = new RegExp(`${text}.+$`, 'ig');
  const filteredList = list.filter(element => {
    return element.user_name.search(re) !== -1;
  });
  // if (filter.length === 0) {
  //   return filteredList;
  // }
  // console.log(filteredList);
  // const filteredHability = filteredList.filter(element => {
  //   console.log(element);
  //   return filter.some(r => element.hability.indexOf(r) >= 0);
  // });

  // return filteredHability;
  return filteredList;
}

export default function FinancialRecord({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const [loadingTrash, setLoadingTrash] = React.useState(false);
  const [financialList, setFinancialList] = React.useState([]);

  const [filteredList, setFilteredList] = React.useState([]);
  const [filterName, setFilterName] = React.useState('');
  const [filter, setFilter] = React.useState([]);
  const [visiblefilters, setVisiblefilters] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const user = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    async function getAllFinanceRecord() {
      let response = null;
      try {
        response = await api.get(`/financerecord`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(signOut());
          // setRefresh(false);
        }
        Alert.alert(
          'Ops!',
          'Houve um erro ao tentar buscar lançamentos, tente novamente.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        console.log(error.response);
        return error;
      }
      setFinancialList(response.data);
      setFilteredList(response.data);
      setLoading(false);
      setReload(false);
    }
    getAllFinanceRecord();
  }, [user, reload]);

  async function onPressDelete(uuid) {
    setLoading(true);
    try {
      await api.delete(`/financerecord/${uuid}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        // dispatch(signOut());
        // setRefresh(false);
      }
      setLoading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar excluir esse lançamento, tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      console.log(error);
      return;
    }
    // setLoadingTrash(false);
    Alert.alert('Lançamento excluido com sucesso', '', [{ text: 'OK' }], {
      cancelable: false,
    });
    setReload(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="default" />

      <Header navigation={navigation} onPress={() => {}} />

      <Filter
        value={filterName}
        onChangeText={text => {
          setFilterName(text);
          setFilteredList(filterList(text, financialList, filter));
        }}
        onPressClear={() => {
          setFilterName('');
          setFilteredList(filterList('', financialList, filter));
        }}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <ContentLoader
            speed={2}
            width={width - 40}
            minHeight={350}
            viewBox="0 0 400 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* <Circle cx="30" cy="30" r="30" /> */}
            <Rect x="10" y="17" rx="4" ry="4" width="390" height="13" />
            <Rect x="10" y="40" rx="3" ry="3" width="270" height="10" />
            <Rect x="10" y="60" rx="3" ry="3" width="200" height="10" />
            {/* <Circle cx="30" cy="120" r="30" /> */}
            <Rect x="10" y="107" rx="4" ry="4" width="390" height="13" />
            <Rect x="10" y="130" rx="3" ry="3" width="270" height="10" />
            <Rect x="10" y="150" rx="3" ry="3" width="200" height="10" />
            {/* <Circle cx="30" cy="210" r="30" /> */}
            <Rect x="10" y="197" rx="4" ry="4" width="390" height="13" />
            <Rect x="10" y="220" rx="3" ry="3" width="270" height="10" />
            <Rect x="10" y="240" rx="3" ry="3" width="200" height="10" />
            {/* <Circle cx="30" cy="300" r="30" /> */}
            <Rect x="10" y="287" rx="4" ry="4" width="390" height="13" />
            <Rect x="10" y="310" rx="3" ry="3" width="270" height="10" />
            <Rect x="10" y="330" rx="3" ry="3" width="200" height="10" />
            {/* <Circle cx="30" cy="300" r="30" /> */}
            <Rect x="10" y="377" rx="4" ry="4" width="390" height="13" />
            <Rect x="10" y="400" rx="3" ry="3" width="270" height="10" />
            <Rect x="10" y="420" rx="3" ry="3" width="200" height="10" />
          </ContentLoader>
        </View>
      ) : (
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <RecordItem
              navigation={navigation}
              data={item}
              loading={loadingTrash}
              onPress={() => onPressDelete(item.uuid)}
            />
          )}
          keyExtractor={item => item.uuid}
        />
      )}
      <ModalFilters
        visible={visiblefilters}
        onPressDone={() => setVisiblefilters(!visiblefilters)}
      />
    </View>
  );
}
