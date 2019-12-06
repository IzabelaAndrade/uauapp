import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

// import { Container } from './styles';
// const { width, height } = Dimensions.get('window');

function Status(props) {
  let statusColor = '#fff';

  // console.log(props.status);
  switch (props.status) {
    case 'Aguardando Cotação':
      statusColor = '#F44336';
      break;

    case 'Em Cotação':
      statusColor = '#1976D2';
      break;

    case 'Concluído':
      statusColor = '#388E3C';
      break;

    default:
      break;
  }

  return (
    <View
      style={{
        backgroundColor: statusColor,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        borderRadius: 20,
      }}
    >
      <Text style={{ color: '#fff' }}>{props.status} </Text>
    </View>
  );
}

export default function OrderCard(props) {
  return (
    <View
      style={{
        padding: 5,
        // backgroundColor: '#bcbcbc',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 0.5,
          borderColor: '#bcbcbc',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {/* <AntDesign name="clockcircleo" size={20} color="#f48024"
            style={{ marginRight: 20, alignItems: 'center', }}
          /> */}
          <Text style={{ fontSize: 28, fontWeight: '400' }}>
            Pedido Nº {props.data.number}
          </Text>
        </View>
        <View style={{}}>
          <Text style={{ fontWeight: '400', alignSelf: 'center' }}>
            {moment(props.data.createat).format('DD MMM')}
          </Text>
          {/* <Text style={{ color: '#bcbcbc', fontSize: 12 }}>
            Criado em:
          </Text>
          <Text style={{ fontWeight: '400', color: '#747474', fontSize: 14 }}>
            24/11/2019
        </Text> */}
        </View>
      </View>

      <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
        Obra:{'\t'}
        <Text style={{ fontWeight: '600', color: '#000', fontSize: 16 }}>
          {props.data.place}
        </Text>
      </Text>

      <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
        Autor:{'\t'}
        <Text style={{ fontWeight: '600', color: '#000', fontSize: 16 }}>
          {props.data.author}
        </Text>
      </Text>
      <Text style={{ color: '#bcbcbc', marginTop: 10 }}>
        Previsão de Entrega:{'\t'}
        <Text style={{ fontWeight: '400', color: '#000', fontSize: 16 }}>
          {moment(props.data.finalDate).format('DD/MM/YYYY')}
        </Text>
      </Text>

      <Text style={{ color: '#f9aa31', marginVertical: 5 }}>
        {' '}
        Tags: {props.data.tags}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderTopWidth: 0.5,
          borderColor: '#bcbcbc',
        }}
      >
        <Status status={props.data.status} />

        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => props.onPress(props.data)}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#f48024',
            }}
          >
            Ver Pedido
          </Text>
          <Feather
            name="chevron-down"
            size={20}
            color="#f48024"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
