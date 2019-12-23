import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

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
  if (props.item.deleted === 1) {
    return (
      <View style={stylesOrderTable.content}>
        <View style={stylesOrderTable.colun1}>
          <Text style={[stylesOrderTable.contentText, { color: '#bcbcbc' }]}>
            {props.item.originalQuantity}
          </Text>
          <Text
            style={[stylesOrderTable.contentTextMeta, { color: '#bcbcbc' }]}
          >
            {props.item.unity}
          </Text>
        </View>
        <View style={stylesOrderTable.colun2}>
          <Text style={[stylesOrderTable.contentText, { color: '#bcbcbc' }]}>
            {props.item.product}
          </Text>
        </View>
        <ButtonIcon item={props.item} icon="delete" disabled />
      </View>
    );
  }
  return (
    <View style={stylesOrderTable.content}>
      <View style={stylesOrderTable.colun1}>
        <Text style={stylesOrderTable.contentText}>
          {props.item.originalQuantity}
        </Text>
        <Text style={stylesOrderTable.contentTextMeta}>{props.item.unity}</Text>
      </View>
      <View style={stylesOrderTable.colun2}>
        <Text style={stylesOrderTable.contentText}>{props.item.product}</Text>
      </View>
      {props.remove ? (
        <ButtonIcon
          item={props.item}
          icon="closecircle"
          onPress={props.onPress}
        />
      ) : null}
      {props.item.deliveryDate ? (
        <ButtonIcon item={props.item} icon="truck" onPress={props.onPress} />
      ) : null}
    </View>
  );
}

function ButtonIcon(props) {
  return (
    <TouchableOpacity
      style={stylesOrderTable.btnDelete}
      disabled={props.disabled}
      onPress={() => props.onPress(props.item)}
    >
      {props.icon === 'truck' ? (
        <Feather name={props.icon} size={20} color="#388E3C" />
      ) : (
        <AntDesign name={props.icon} size={20} color="#bcbcbc" />
      )}
    </TouchableOpacity>
  );
}

export default function OrderTable(props) {
  return (
    <FlatList
      style={stylesOrderTable.table}
      ListHeaderComponent={() => <Header />}
      data={props.data}
      renderItem={({ item }) => (
        <Item item={item} onPress={props.onPressItem} remove={props.remove} />
      )}
      keyExtractor={item => item.productCode}
      ListFooterComponent={<View style={stylesOrderTable.footer} />}
    />
  );
}
