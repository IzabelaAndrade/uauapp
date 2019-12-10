import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';

const stylesCOHeader = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  btnPlace: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f48024',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btnPlaceText: {
    flex: 1,
  },
  btnPlaceIcon: { marginLeft: 10 },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lableTextDate: {
    flex: 3,
    fontSize: 18,
    color: '#7f7f7f',
    paddingLeft: 15,
  },
  containerInputDate: {
    flex: 2,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f48024',
    paddingRight: 15,
    color: '#bcbcbc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDate: {
    fontSize: 18,
    color: '#222426',
  },
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
  btnModal: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#bcbcbc',
  },
  bnTextModal: { fontWeight: '600', fontSize: 16 },
});

function Item(props) {
  return (
    <TouchableOpacity
      style={stylesCOHeader.btnModal}
      onPress={() => props.onPress(props.place)}
    >
      <Text style={stylesCOHeader.bnTextModal}>{props.place.name}</Text>
    </TouchableOpacity>
  );
}

function ModalListItem(props) {
  const [textinputvaluePlace, setTextinputPlace] = React.useState('');
  const [filteredlistPlace, setfilteredlistPlace] = React.useState(props.data);

  searchListPlace = text => {
    setTextinputPlace(text);
    const reg = new RegExp(text, 'ig');
    const list = props.data.filter(item => {
      return reg.test(item.name);
    });
    setfilteredlistPlace(list);
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
      <View style={stylesCOHeader.containerModal}>
        <View style={stylesCOHeader.satatusBarModal} />
        <View style={stylesCOHeader.inputModal}>
          <View style={stylesCOHeader.inputModalIcon}>
            <Feather name="search" size={32} color="#bcbbbb" />
          </View>
          <TextInput
            style={stylesCOHeader.inputModalText}
            onChangeText={text => searchListPlace(text)}
            value={textinputvaluePlace}
          />
        </View>
        <FlatList
          data={filteredlistPlace}
          renderItem={({ item }) => (
            <Item place={item} onPress={props.onSelectPlace} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </Modal>
  );
}

export default function HeaderOrderTable(props) {
  const moment = require('moment');
  return (
    <View style={stylesCOHeader.container}>
      <TouchableOpacity style={stylesCOHeader.btnPlace} onPress={props.onPress}>
        <Text
          style={
            ([stylesCOHeader.btnPlaceText],
            {
              fontWeight: props.choicePlace ? '500' : 'normal',
              fontSize: props.choicePlace ? 20 : 18,
              color: props.choicePlace ? '#222426' : '#bcbcbc',
            })
          }
        >
          {props.choicePlace ? props.choicePlace : 'Escolha uma Obra'}
        </Text>
        <Feather
          name="chevron-down"
          size={20}
          color="#f48024"
          style={stylesCOHeader.btnPlaceIcon}
        />
      </TouchableOpacity>

      <View style={stylesCOHeader.containerDate}>
        <Text style={stylesCOHeader.lableTextDate}>Previsão de Etrega:</Text>
        <View style={stylesCOHeader.containerInputDate}>
          <TextInput
            style={[
              stylesCOHeader.inputDate,
              { fontWeight: props.value ? '500' : 'normal' },
            ]}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
            placeholder={moment().format('DD/MM/YYYY')}
            placeholderTextColor="#bcbcbc"
            onChangeText={props.onChangeText}
            onEndEditing={props.onEndEditing}
            value={props.value}
          />
        </View>
      </View>
      <ModalListItem
        visible={props.visible}
        onSelectPlace={props.onSelectPlace}
        data={props.data}
      />
    </View>
  );
}
