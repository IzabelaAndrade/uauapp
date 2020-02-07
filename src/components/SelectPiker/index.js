import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  Dimensions,
  Modal,
} from 'react-native';

// import { Container } from './styles';
const { width } = Dimensions.get('window');

export default function SelectPiker({ list, onPress, visible }) {
  const [value, setvalue] = React.useState('');
  return (
    <Modal
      style={{
        flex: 1,
      }}
      animationType="fade"
      transparent
      visible={visible}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            height: 250,
            width,
            backgroundColor: '#fff',
          }}
        >
          <View
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'flex-end',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#f48024',
            }}
          >
            <TouchableOpacity
              style={{
                width: 60,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onPress(value)}
            >
              <Text style={{ color: '#f48024', fontWeight: '500' }}>OK</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={value}
            style={{
              flex: 1,
            }}
            onValueChange={(itemValue, itemIndex) => setvalue(itemValue)}
          >
            {list.map((element, index) => (
              <Picker.Item
                key={index}
                label={!element ? 'Selecione uma opção' : element}
                value={element === 'Selecione uma opção' ? '' : element}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
}
