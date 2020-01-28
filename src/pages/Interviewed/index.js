import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

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
import api from '../../services/api';
// import { Container } from './styles';

const intreviewedList = [
  {
    id: '1',
    name: 'João da Silva',
    especialidade: 'Pedreiro, Alvenaria',
    phone: '(65) 99999-2222',
    image:
      'data:image/jpeg;base64,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',
    score: {
      transport: '3',
      home: '2',
      professional: '5',
      financial: '4',
      family: '1',
    },
  },
  {
    id: '2',
    name: 'Pedro Henrique da Costa',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcIlnYog72aJAkCfmxOSPdUK7INX2xPNAR4isBOFhnV7usVMUD&s',
    especialidade: 'Marceneiro, Montador',
    phone: '(65) 99999-3333',
    score: '4',
  },
  {
    id: '3',
    name: 'Maria Aparecida de Jesus Ribeiro',
    image:
      'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg',
    especialidade: 'Servios Gerais',
    phone: '(65) 99999-4444',
    score: '2',
  },
];

function Info({ item, navigation }) {
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
        navigation.navigate('PersonalData', {
          person: item,
        })
      }
    >
      <Image
        style={{ width: 35, height: 35, borderRadius: 25 }}
        source={{ uri: img.url }}
      />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <Text style={{ fontWeight: '500', fontSize: 18 }}>{item.name}</Text>
        <Text style={{ color: '#afafaf' }}>
          {item.hability.length < 1 ? '' : item.hability.join(', ')}
        </Text>
        <Text style={{}}>{item.phone}</Text>
        {/* <ScoreStatus score={item.score} /> */}
      </View>
    </TouchableOpacity>
  );
}

function ScoreStatus({ score }) {
  return (
    <View
      style={{
        height: 30,
        backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <IconScore type="home" score={score.home} />
      <IconScore type="transport" score={score.transport} />
      <IconScore type="family" score={score.family} />
      <IconScore type="financial" score={score.financial} />
      <IconScore type="professional" score={score.professional} />
    </View>
  );
}

function IconScore({ type, score }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 60,
        alignItems: 'center',
      }}
    >
      <RenderIcon type={type} />
      <View style={{ marginLeft: 10 }}>
        <Score color="#eeeeee" />
        <Score color="#eeeeee" />
        <Score color="#eeeeee" />
        <Score color="#f48024" />
        <Score color="#f48024" />
      </View>
    </View>
  );
}

function RenderIcon({ type }) {
  switch (type) {
    case 'transport':
      return (
        <MaterialCommunityIcons name="car-pickup" size={20} color="#bcbcbc" />
      );
    case 'family':
      return <Ionicons name="ios-people" size={20} color="#bcbcbc" />;

    case 'home':
      return <FontAwesome name="home" size={20} color="#bcbcbc" />;

    case 'professional':
      return <Entypo name="tools" size={18} color="#bcbcbc" />;

    case 'financial':
      return <MaterialIcons name="attach-money" size={18} color="#bcbcbc" />;

    default:
      return (
        <MaterialCommunityIcons name="car-pickup" size={20} color="#bcbcbc" />
      );
  }
}

function Score({ color }) {
  return (
    <View
      style={{
        width: 15,
        height: 3,
        borderRadius: 5,
        backgroundColor: color,
        marginBottom: 1.5,
      }}
    />
  );
}

export default function Interviewed({ navigation }) {
  const user = useSelector(state => state.auth);
  const [interviewed, setinterviewed] = React.useState([]);

  useEffect(() => {
    async function getAllInterviewed() {
      let response = null;
      try {
        response = await api.get('/person', {
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
        return error;
      }
      setinterviewed(response.data);
    }
    getAllInterviewed();
  }, [user]);
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar barStyle="default" />
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
          onPress={() => navigation.navigate('PersonalDataForm')}
        >
          <Feather name="plus" size={28} color="#f48024" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={interviewed}
        renderItem={({ item }) => <Info item={item} navigation={navigation} />}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
}
