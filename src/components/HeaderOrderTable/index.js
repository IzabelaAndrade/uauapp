import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

function Item(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#bcbcbc',
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.onPress(props.place)}
      >
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          {props.place.name}
        </Text>
      </TouchableOpacity>
    </View>
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
      <SafeAreaView
        style={{
          backgroundColor: '#f48024',
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#f48024',
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="search" size={32} color="#bcbbbb" />
            </View>
            <TextInput
              style={{
                paddingHorizontal: 10,
                height: 50,
                flex: 1,
                fontSize: 18,
                fontWeight: '400',
                color: '#222426',
              }}
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
      </SafeAreaView>
    </Modal>
  );
}

export default function HeaderOrderTable(props) {
  let moment = require('moment');
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <TouchableOpacity
        style={{
          height: 50,
          borderBottomWidth: 1,
          borderColor: '#f48024',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}
        onPress={props.onPress}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: props.choicePlace ? '500' : 'normal',
            fontSize: props.choicePlace ? 20 : 18,
            color: props.choicePlace ? '#222426' : '#bcbcbc',
          }}
        >
          {props.choicePlace ? props.choicePlace : 'Escolha uma Obra'}
        </Text>
        <Feather
          name="chevron-down"
          size={20}
          color="#f48024"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            flex: 3,
            fontSize: 18,
            color: '#7f7f7f',
            paddingLeft: 15,
          }}
        >
          Previsão de Etrega:
        </Text>
        <View
          style={{
            flex: 2,
            height: 50,
            borderBottomWidth: 1,
            borderColor: '#f48024',
            paddingRight: 15,
            color: '#bcbcbc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              fontWeight: props.value ? '500' : 'normal',
              fontSize: 18,
              color: '#222426',
            }}
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
