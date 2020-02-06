import React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function Item({ item, onSelectItem }) {
  return (
    <TouchableOpacity
      style={{ marginVertical: 10, marginLeft: 10 }}
      onPress={() => onSelectItem(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );
}

function filterList(text, list) {
  const re = new RegExp(`${text}.+$`, 'i');
  const filteredList = list.filter(element => {
    return element.search(re) !== -1;
  });
  return filteredList;
}

export default function ModalSearch({ open, data, onSelect }) {
  const [showModal, setShowModal] = React.useState(open);
  const [value, setvalue] = React.useState('');
  const [list, setList] = React.useState(data);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={() => {
        console.log('close');
      }}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.textSearchContainer}>
            <AntDesign
              name="search1"
              size={25}
              color="#8b8b8b"
              style={styles.iconSearch}
            />
            <TextInput
              placeholder="Ex: João da Silva"
              underlineColorAndroid="transparent"
              style={styles.textSearch}
              onChangeText={text => {
                setvalue(text);
                setList(filterList(text, data));
              }}
              value={value}
            />
            {value ? (
              <TouchableOpacity
                style={styles.iconCloseContainer}
                onPress={() => setvalue('')}
              >
                <AntDesign
                  name="closecircleo"
                  size={15}
                  color="#8b8b8b"
                  style={styles.iconClose}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <FlatList
            data={list}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Item onSelectItem={selected => onSelect(selected)} item={item} />
            )}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: '#F48024',
              }}
            >
              <Text style={{ color: '#FFFF', fontWeight: '700' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
  },
  container: {
    backgroundColor: '#FFFF',
    marginVertical: 30,
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 10,
  },
  textSearchContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,.06)',
    borderRadius: 8,
    alignItems: 'center',
  },
  textSearch: {
    flex: 1,
    fontSize: 19,
    height: 50,
  },
  iconSearch: {
    marginHorizontal: 10,
  },
  iconCloseContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconClose: {
    paddingRight: 10,
  },
});
