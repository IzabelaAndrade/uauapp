import React from 'react';
import { View, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons';

import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
export default function ShowFullImage({ onPress, imageUrl, imgVisible }) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={imgVisible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: Constants.statusBarHeight,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            onPress={onPress}
          >
            <Feather name="chevron-left" size={28} color="#f48024" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{ width: width - 40, height: height - 200 }}
            source={{ uri: imageUrl }}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
}
