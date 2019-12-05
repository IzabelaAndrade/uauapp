import React from 'react';
import {
  View, TouchableOpacity,
  Text,
  FlatList
} from 'react-native';

import {
  AntDesign,
  Feather,
} from '@expo/vector-icons';

// import { Container } from './styles';


function Header() {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
      }}
    >
      <View
        style={{ flex: 1, }}
      >
        <Text style={{ color: '#f48024' }} >Qtde</Text>
      </View>
      <View
        style={{ flex: 4, }}
      >
        <Text style={{ color: '#f48024' }}>Descrição</Text>
      </View>
    </View>
  )
}

function Item(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 5,
        borderTopWidth: .5,
        borderColor: '#bcbcbc'
      }}
    >
      <View
        style={{ flex: 2, }}
      >
        <Text style={{ fontWeight: '600', fontSize: 16 }}>{props.item.qtde}</Text>
        <Text style={{ color: '#f48024', fontSize: 12 }}>{props.item.unidade}</Text>
      </View>
      <View
        style={{ flex: 9, }}
      >
        <Text
          style={{ fontWeight: '600', fontSize: 16 }}>
          {props.item.description}
        </Text>
      </View>
      {props.enabled ?
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

          onPress={() => props.onPress(props.item)}
        >
          <AntDesign name="closecircle" size={20} color="#bcbcbc"
            style={{}}
          />
        </TouchableOpacity>
        : null}
    </View>
  );
}

export default function OrderTable(props) {
  return (
    <FlatList
      style={{
        margin: 6,
        padding: 10,
        borderWidth: .5,
        borderColor: '#f48024',
        borderRadius: 4,
        flex: 1,
      }}
      ListHeaderComponent={() => <Header />}
      data={props.data}
      renderItem={({ item }) =>
        <Item item={item} onPress={props.onDelete} enabled={props.enabled} />}
      keyExtractor={item => item.id}
      ListFooterComponent={<View style={{padding: 10,}} />}

    />
  );
}
