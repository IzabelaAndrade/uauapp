import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from 'react-native';

import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import HeaderForm from '../../components/HeaderForm';

const DATA = [
  {
    title: 'Janeiro - 2020',
    data: [
      {
        signal: '-',
        value: '300,00',
        description: 'Vale - Emprestimo para compra de celular 3/5',
        weekDay: 'qui',
        monthDay: '30',
        month: 'Jan',
      },
      {
        signal: '-',
        value: '50,00',
        description: 'Vale - Transferência bancaria',
        weekDay: 'sex',
        monthDay: '03',
        month: 'Jan',
      },
      {
        signal: '-',
        value: '150,00',
        description: 'Vale Ferramenta - Furadeira',
        weekDay: 'sab',
        monthDay: '04',
        month: 'Jan',
      },
      {
        signal: '+',
        value: '1.000,00',
        description:
          'Medição - Serviços realizados na SESP, SES e na Santa Casa',
        weekDay: 'seg',
        monthDay: '27',
        month: 'Jan',
      },
    ],
  },
  {
    title: 'Dezembro - 2019',
    data: [
      {
        signal: '-',
        value: '300,00',
        description: 'Vale - Emprestimo para compra de celular 2/5',
        weekDay: 'sex',
        monthDay: '03',
        month: 'Dez',
      },
      {
        signal: '-',
        value: '100,00',
        description: 'Vale - Para pagar aluguel',
        weekDay: 'sab',
        monthDay: '04',
        month: 'Dez',
      },
      {
        signal: '+',
        value: '2.380,00',
        description:
          'Medição - Serviços realizados na SESP, SES e na Santa Casa',
        weekDay: 'seg',
        monthDay: '19',
        month: 'Dez',
      },
    ],
  },
];

const FinancialHeader = () => {
  return (
    <View style={{ marginLeft: 20 }}>
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
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>Titular: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>
              Mária Lucia Campos
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '500', fontSize: 15 }}>CPF: </Text>
            <Text style={{ color: 'grey', fontSize: 15 }}>023.256.599-98</Text>
          </View>
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
            marginLeft: 5,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 20 }}>Saldo</Text>
          <Text style={{ color: 'green', fontSize: 23, fontWeight: '900' }}>
            1.000,00
          </Text>
        </View>
      </View>
    </View>
  );
};

const FinancialSelectDate = () => {
  return (
    <View
      style={{
        backgroundColor: '#e6e6e6',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#B5B5B5',
        }}
      >
        <Text style={{ color: '#ffff' }}>30 dias</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#e6e6e6',
        }}
      >
        <Text style={{ color: '#898989' }}>60 dias</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#e6e6e6',
        }}
      >
        <Text style={{ color: '#898989' }}>90 dias</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#e6e6e6',
        }}
      >
        <Text style={{ color: '#898989' }}>Início</Text>
      </View>
    </View>
  );
};

function Item({ data }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          // marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 12, color: '#898989' }}>{data.weekDay}</Text>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#898989' }}>
          {data.monthDay}
        </Text>
        <Text style={{ fontSize: 12, color: '#898989' }}>{data.month}</Text>
      </View>
      <View
        style={{
          flex: 5,
          padding: 10,
          borderColor: '#898989',
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text
            style={{
              color: data.signal === '+' ? 'green' : 'red',
              fontSize: 25,
              fontWeight: data.signal === '-' ? '700' : null,
            }}
          >
            {data.signal}
          </Text>
          <Text
            style={{
              marginTop: data.signal === '+' ? 0 : 2,
              marginLeft: 5,
              color: 'gray',
              fontSize: 13,
            }}
          >
            {data.value}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text style={{ marginLeft: 5, color: 'gray', fontSize: 13 }}>
            {data.description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const FinancialItem = () => {
  return (
    <SectionList
      stickySectionHeadersEnabled
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item data={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            backgroundColor: '#e6e6e6',
          }}
        >
          <Text sstyle={{ color: '#898989' }}>{title}</Text>
        </View>
      )}
    />
  );
};

const FinancialRelease = () => {};
const ViewSwitch = () => {
  return (
    <View
      style={{
        backgroundColor: '#e6e6e6',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#B5B5B5',
        }}
      >
        <Text style={{ color: '#ffff' }}>Extrato</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 20,
          backgroundColor: '#e6e6e6',
        }}
      >
        <Text style={{ color: '#898989' }}>Lançamento</Text>
      </View>
    </View>
  );
};

export default function FinancialDetailed({ navigation }) {
  const [visible, setvisible] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm navigation={navigation} back />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <FinancialHeader />
        <ViewSwitch />
        <FinancialSelectDate />
        <FinancialItem />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
