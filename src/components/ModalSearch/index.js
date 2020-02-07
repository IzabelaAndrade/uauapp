import React, { useEffect } from 'react';
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
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#AAAAAA',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
      }}
      onPress={() => onSelectItem(item)}
    >
      <View
        style={{
          backgroundColor: '#f48024',
          width: 30,
          height: 30,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}
      >
        <Text style={{ color: '#ffff', fontSize: 15, fontWeight: '700' }}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 18,
          fontWeight: '700',
          color: '#606060',
          // marginBottom: 10,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

function filterList(text, list) {
  const re = new RegExp(`${text}.+$`, 'i');
  const filteredList = list.filter(element => {
    return element.name.search(re) !== -1;
  });
  return filteredList;
}

export default function ModalSearch({ open, data, onSelect, onClose }) {
  const [value, setvalue] = React.useState('');
  const [list, setList] = React.useState([]);
  useEffect(() => {
    setList(data);
  }, [data]);
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={() => {
        onClose();
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
            keyExtractor={item => item.name}
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
              onPress={() => onClose()}
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
