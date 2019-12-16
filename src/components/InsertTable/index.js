import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

const stylesInserTable = StyleSheet.create({
  containerInput: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputQtd: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#f48024',
    marginHorizontal: 15,
    justifyContent: 'center',
    flex: 1,
  },
  inputQtdText: {
    height: 40,
    fontSize: 18,
    color: '#222426',
    flex: 1,
    marginLeft: 10,
  },
  inputItem: {
    flex: 4,
    borderBottomWidth: 1,
    borderColor: '#f48024',
    height: 40,
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  inputItemText: { fontSize: 18, flex: 1 },
  inputItemIcon: { marginRight: 10 },

  containerModal: {
    backgroundColor: '#fff',
    flex: 1,
  },
  satatusBarModal: {
    backgroundColor: '#f48024',
    height: Constants.statusBarHeight,
  },
  inputModal: {
    flexDirection: 'row',
    borderColor: '#f48024',
    borderBottomWidth: 1,
  },
  inputModalIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputModalText: {
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#222426',
  },
  itemModal: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderColor: '#bcbcbc',
  },
  itemModalUn: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  btnModal: {
    flex: 6,
  },
  btnTextModal: { fontWeight: '600', fontSize: 16 },
});

function Item(props) {
  return (
    <View style={stylesInserTable.itemModal}>
      <Text style={stylesInserTable.itemModalUn}>{props.item.Und}</Text>
      <TouchableOpacity
        style={stylesInserTable.btnModal}
        onPress={() => props.onPress(props.item)}
      >
        <Text style={stylesInserTable.btnTextModal}>
          {props.item.Descrição}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalListItem(props) {
  const [textinputvalue, setTextinput] = React.useState('');
  const [filteredlist, setfilteredlist] = React.useState(props.data);

  const searchList = text => {
    setTextinput(text);
    if (text === '') {
      setfilteredlist(props.data);
      return;
    }
    const reg = new RegExp(text, 'ig');
    const list = props.data.filter(item => {
      return reg.test(item.Descrição);
    });
    setfilteredlist(list);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={stylesInserTable.containerModal}>
        <View style={stylesInserTable.satatusBarModal} />
        <View style={stylesInserTable.inputModal}>
          <View style={stylesInserTable.inputModalIcon}>
            <Feather name="search" size={32} color="#bcbbbb" />
          </View>
          <TextInput
            style={stylesInserTable.inputModalText}
            onChangeText={text => searchList(text)}
            value={textinputvalue}
          />
        </View>
        <FlatList
          data={filteredlist}
          renderItem={({ item }) => (
            <Item item={item} onPress={props.onSelect} />
          )}
          keyExtractor={item => item.Codigo}
        />
      </View>
    </Modal>
  );
}

function BtnInsertList(props) {
  return (
    <TouchableOpacity
      style={{
        margin: 15,
        backgroundColor: '#f48024',
        borderRadius: 4,
        height: 30,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: '#fff' }}>+ Add Item</Text>
    </TouchableOpacity>
  );
}

export default function InsertTable(props) {
  return (
    <>
      <View style={stylesInserTable.containerInput}>
        <View style={stylesInserTable.inputQtd}>
          <TextInput
            placeholder="Qtde"
            placeholderTextColor="#bcbcbc"
            keyboardType="numeric"
            returnKeyType="done"
            style={stylesInserTable.inputQtdText}
            onChangeText={props.onChangeText}
            value={props.amount}
          />
        </View>
        <TouchableOpacity
          style={stylesInserTable.inputItem}
          onPress={props.onPress}
        >
          <Text
            style={[
              stylesInserTable.inputItemText,
              {
                color: props.choiceItem ? '#222426' : '#bcbcbc',
              },
            ]}
          >
            {props.choiceItem ? props.choiceItem : 'Selecionar Item'}
          </Text>
          <Feather
            name="chevron-down"
            size={20}
            color="#f48024"
            style={stylesInserTable.inputItemIcon}
          />
        </TouchableOpacity>
      </View>

      <ModalListItem
        visible={props.visible}
        onSelect={props.onSelect}
        data={props.data}
      />

      <BtnInsertList onPress={props.onInsert} />
    </>
  );
}
