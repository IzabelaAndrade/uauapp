import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import MultiSelectPiker from '../../components/MultiSelectPiker';

import api from '../../services/api';
// import { Container } from './styles';

import { jobList } from '../../utils/List';

const { width } = Dimensions.get('window');
function Info({ item, navigation, origin }) {
  const { edit } = navigation.state.params;
  const img = item.Files.find(element => element.type === 'photo');
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() =>
        origin
          ? navigation.navigate(origin, {
              origin,
              uuid: item.uuid,
              person: item,
            })
          : navigation.navigate('PersonalData', {
              person: item,
              edit,
              mode: '',
            })
      }
    >
      <View style={{}}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 25 }}
          source={img ? { uri: img.url } : require('../../assets/avatar.png')}
        />
        {/* <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#00a73a',
              marginTop: -10,
              marginRight: -5,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Entypo name="check" size={15} color="#fff" />
          </View> */}
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: '500', fontSize: 18 }}>{item.name}</Text>
        <Text style={{ color: '#afafaf' }}>
          {!item.hability || item.hability.length < 1
            ? ''
            : item.hability.join(', ')}
        </Text>
        <Text style={{}}>{item.phone}</Text>
        {/* <ScoreStatus score={item.score} /> */}
      </View>
    </TouchableOpacity>
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

function filterList(text, list, filter) {
  const re = new RegExp(`${text}.+$`, 'i');
  const filteredList = list.filter(element => {
    return element.name.search(re) !== -1;
  });
  if (filter.length === 0) {
    return filteredList;
  }
  const filteredHability = filteredList.filter(element => {
    return filter.some(r => element.hability.indexOf(r) >= 0);
  });

  return filteredHability;
}

export default function UserList({ navigation }) {
  const origin = navigation.state.params.origin
    ? navigation.state.params.origin
    : null;
  const user = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [interviewed, setinterviewed] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);
  const [value, setvalue] = React.useState('');
  const [filter, setfilter] = React.useState([]);
  const [visiblehability, setvisiblehability] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    async function getAllUsers() {
      let response = null;
      try {
        response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(signOut());
          // setRefresh(false);
        }
        console.log(error);
        setLoading(false);
        return error;
      }
      setinterviewed(response.data);
      setFilteredList(response.data);
      setLoading(false);
    }
    getAllUsers();
  }, [user]);
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar barStyle="default" />

      <Header
        navigation={navigation}
        onPress={() => setvisiblehability(true)}
      />

      <View style={{}}>
        <Text
          style={{ marginHorizontal: 15, color: '#f48024', fontWeight: '500' }}
        >
          {filter.length < 1 ? '' : filter.join(', ')}
        </Text>
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
            onChangeText={text => {
              setvalue(text);
              setFilteredList(filterList(text, interviewed, filter));
            }}
            value={value}
          />
          {value ? (
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              onPress={() => setvalue('')}
            >
              <AntDesign
                name="closecircleo"
                size={15}
                color="#8b8b8b"
                style={{ paddingRight: 10 }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

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
            height={800}
            viewBox="0 0 400 950"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <Circle cx="30" cy="30" r="30" />
            <Rect x="80" y="15" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="40" rx="3" ry="3" width="270" height="10" />

            <Circle cx="30" cy="120" r="30" />
            <Rect x="80" y="105" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="130" rx="3" ry="3" width="270" height="10" />

            <Circle cx="30" cy="210" r="30" />
            <Rect x="80" y="195" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="220" rx="3" ry="3" width="270" height="10" />

            <Circle cx="30" cy="300" r="30" />
            <Rect x="80" y="285" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="310" rx="3" ry="3" width="270" height="10" />

            <Circle cx="30" cy="390" r="30" />
            <Rect x="80" y="375" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="400" rx="3" ry="3" width="270" height="10" />

            <Circle cx="30" cy="480" r="30" />
            <Rect x="80" y="465" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="490" rx="3" ry="3" width="270" height="10" />
          </ContentLoader>
        </View>
      ) : (
        <FlatList
          data={filteredList}
          renderItem={({ item }) => (
            <Info item={item} navigation={navigation} origin={origin} />
          )}
          keyExtractor={item => item.uuid}
        />
      )}
      <MultiSelectPiker
        show={visiblehability}
        dataList={jobList}
        selectedList={filter}
        onPressConfirm={selectedList => {
          setfilter(selectedList);
          setvisiblehability(false);
          setFilteredList(filterList(value, interviewed, selectedList));
        }}
      />
    </View>
  );
}
