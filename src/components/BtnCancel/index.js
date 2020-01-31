import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// import { Container } from './styles';

export default function BtnCancel({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'center',
        paddingHorizontal: 20,
        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#f48024' }}>
        Cancelar
      </Text>
    </TouchableOpacity>
  );
}
