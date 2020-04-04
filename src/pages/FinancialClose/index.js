import React, { useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Cpf from '../../utils/Cpf';
import api from '../../services/api';
import Money from '../../utils/Money';

import HeaderForm from '../../components/HeaderForm';

const FinancialCloseItem = ({ navigation, data }) => {
  console.log(data);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 7,
        marginBottom: 5,
        marginTop: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 25 }}
          source={{
            uri: `http://192.168.0.17:3333/files/${data.image}`,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: '500', fontSize: 18 }}>
            {data.user_name}
          </Text>
          <Text style={{ color: 'grey', fontSize: 13 }}>
            {Cpf.format(data.user_cpf)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Banco: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>{data.bank}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Ag: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>{data.agency}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Cc: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>{data.account}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 20 }}>R$</Text>
          <Text
            style={{
              color: data.balance.substring(0, 1) === '-' ? 'red' : 'green',
              fontSize: 23,
              fontWeight: '700',
            }}
          >
            {data.balance.substring(0, 1) === '-'
              ? `- ${Money.format(data.balance)}`
              : Money.format(data.balance) || '0,00'}
            {/* {data.balance} */}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginTop: 10,
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: 'green',
              paddingHorizontal: 10,
              paddingVertical: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="account-check"
              size={25}
              color="green"
            />
            <Text style={{ marginLeft: 5, color: 'green' }}>Pago</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() =>
            navigation.navigate('FinancialDetailed', {
              person: {
                uuid: data.uuid,
                name: data.user_name,
                cpf: data.user_cpf,
                BankAccount: {
                  name: data.bank_user_name,
                  cpf: data.cpf,
                  bank: data.bank,
                  agency: data.agency,
                  account: data.account,
                  operation: data.operation,
                },
                Files: [
                  {
                    type: 'photo',
                    url: `http://192.168.0.17:3333/files/${data.image}`,
                  },
                ],
              },
            })
          }
        >
          <Text style={{ color: '#f48024', fontWeight: '700' }}>Detalhar</Text>
          <Feather
            style={{ marginTop: 5, alignSelf: 'center' }}
            name="chevron-down"
            size={20}
            color="#f48024"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FinancialCloseItem1 = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 7,
        marginBottom: 5,
        marginTop: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 25 }}
          source={{
            uri:
              'http://192.168.0.14:3333/files/fde6ae429c5c88fcba25abebcab38ff6.jpg',
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: '500', fontSize: 18 }}>
            Cotton Rosa Silva Neto
          </Text>
          <Text style={{ color: 'grey', fontSize: 13 }}>054.126.547-65</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Banco: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>Banco do Brasil</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Ag: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>4521</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Cc: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>1345-5</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 20 }}>R$</Text>
          <Text style={{ color: 'green', fontSize: 23, fontWeight: '900' }}>
            1.000,00
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginTop: 10,
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: 'green',
              paddingHorizontal: 10,
              paddingVertical: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="account-check"
              size={25}
              color="green"
            />
            <Text style={{ marginLeft: 5, color: 'green' }}>Pago</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('FinancialDetailed')}
        >
          <Text style={{ color: '#f48024', fontWeight: '700' }}>Detalhar</Text>
          <Feather
            style={{ marginTop: 5, alignSelf: 'center' }}
            name="chevron-down"
            size={20}
            color="#f48024"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function FinancialClose({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const [financialList, setFinancialList] = React.useState([]);
  const user = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    async function getFinancialClose() {
      let response = null;
      try {
        response = await api.get(`/finacialclose`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(signOut());
          // setRefresh(false);
        }
        console.log(error.response);
        return error;
      }
      console.log(response.data);
      setFinancialList(response.data);
      setLoading(false);
    }
    getFinancialClose();
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        back
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <FlatList
          data={financialList}
          renderItem={({ item }) => (
            <FinancialCloseItem navigation={navigation} data={item} />
          )}
          keyExtractor={item => item.uuid}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
