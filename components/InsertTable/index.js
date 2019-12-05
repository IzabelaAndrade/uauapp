import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Modal, Alert,
  SafeAreaView, FlatList,
} from 'react-native';
import Constants from 'expo-constants';

import {
  Feather,
} from '@expo/vector-icons';




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
        style={{ flex: 1, }}
      >
        <Text style={{ fontWeight: '600', fontSize: 16 }}>{props.item.unidade}</Text>
      </View>
      <TouchableOpacity
        style={{ flex: 6, }}
        onPress={() => props.onPress(props.item)}
      >
        <Text
          style={{ fontWeight: '600', fontSize: 16 }}>
          {props.item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


function ModalListItem(props) {
  const [textinputvalue, setTextinput] = React.useState('');
  const [filteredlist, setfilteredlist] = React.useState(props.data);

  searchList = (text) => {
    setTextinput(text);
    let reg = new RegExp(text, 'ig');
    let list = props.data.filter((item) => {
      return reg.test(item.description);
    });
    setfilteredlist(list);
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <SafeAreaView style={{
        backgroundColor: '#f48024',
        flex: 1
      }}>
        <View style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>
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
              // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              style={{
                paddingHorizontal: 10,
                height: 50,
                flex: 1,
                fontSize: 18,
                fontWeight: '400',
                color: '#222426'
              }}
              onChangeText={text => searchList(text)}
              value={textinputvalue}
            />
          </View>
          <FlatList
            data={filteredlist}
            renderItem={({ item }) => <Item item={item} onPress={props.onSelect} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
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
  )
}


export default function InsertTable(props) {
  return (
    <View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderColor: '#f48024',
            marginHorizontal: 15,
            justifyContent: 'center',
            // alignItems: 'center',
            flex: 1,
          }}
        >
          <TextInput
            placeholder='Qtde'
            placeholderTextColor='#bcbcbc'
            keyboardType='numeric'
            returnKeyType='done'
            style={{
              height: 40, fontSize: 18, color: '#222426',
              flex: 1,
              marginLeft: 10
            }}
            onChangeText={props.onChangeText}
            value={props.qtde}
          />
        </View>
        <View
          style={{
            flex: 4,
            borderBottomWidth: 1,
            borderColor: '#f48024',
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              flexDirection: 'row',
              marginHorizontal: 15,
              alignItems: 'center',
            }}
            onPress={props.onPress}
          >
            <Text
              style={{
                fontSize: 18,
                color: props.choiceItem ? '#222426' : '#bcbcbc',
                flex: 1,
              }}
            >{props.choiceItem ? props.choiceItem : 'Selecionar Item'}</Text>
            <Feather name="chevron-down" size={20} color="#f48024"
              style={{ marginRight: 10, }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ModalListItem
        visible={props.visible}
        onSelect={props.onSelect}
        data={props.data}
      />

      <BtnInsertList
        onPress={props.onInsert}
      />

    </View>
  );
}
