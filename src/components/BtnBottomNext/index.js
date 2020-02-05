import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// import { Container } from './styles';

export default function BtnBottomNext({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        height: 50,
        width: 80,
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Ionicons name="ios-arrow-round-forward" size={40} color="#f48024" />
    </TouchableOpacity>
  );
}
