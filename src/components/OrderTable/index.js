import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const stylesOrderTable = StyleSheet.create({
  table: {
    margin: 6,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#f48024',
    borderRadius: 4,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  headertextQtd: { color: '#f48024', flex: 1 },
  headertextDescrition: { color: '#f48024', flex: 4 },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderColor: '#bcbcbc',
  },
  colun1: { flex: 2 },
  colun2: { flex: 9 },
  contentText: {
    fontWeight: '600',
    fontSize: 16,
  },
  contentTextMeta: { color: '#f48024', fontSize: 12 },
  btnDelete: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: { padding: 10 },
});

function Header() {
  return (
    <View style={stylesOrderTable.header}>
      <Text style={stylesOrderTable.headertextQtd}>Qtde</Text>
      <Text style={stylesOrderTable.headertextDescrition}>Descrição</Text>
    </View>
  );
}

function Item(props) {
  return (
    <View style={stylesOrderTable.content}>
      <View style={stylesOrderTable.colun1}>
        <Text style={stylesOrderTable.contentText}>{props.item.amount}</Text>
        <Text style={stylesOrderTable.contentTextMeta}>
          {props.item.unidade}
        </Text>
      </View>
      <View style={stylesOrderTable.colun2}>
        <Text style={stylesOrderTable.contentText}>{props.item.product}</Text>
      </View>
      {props.enabled ? (
        <TouchableOpacity
          style={stylesOrderTable.btnDelete}
          onPress={() => props.onPress(props.item)}
        >
          <AntDesign name="closecircle" size={20} color="#bcbcbc" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default function OrderTable(props) {
  return (
    <FlatList
      style={stylesOrderTable.table}
      ListHeaderComponent={() => <Header />}
      data={props.data}
      renderItem={({ item }) => (
        <Item item={item} onPress={props.onDelete} enabled={props.enabled} />
      )}
      keyExtractor={item => item.productCode}
      ListFooterComponent={<View style={stylesOrderTable.footer} />}
    />
  );
}
