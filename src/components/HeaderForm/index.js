import React from 'react';
import { View, TouchableOpacity, StatusBar, Text, Image } from 'react-native';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';

export default function HeaderForm({
  navigation,
  screen,
  back,
  save,
  onPress,
}) {
  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#f48024" />
      <View
        style={{
          marginTop: Constants.statusBarHeight,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {back ? (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={28} color="#f48024" />
          </TouchableOpacity>
        ) : (
          <View style={{ paddingHorizontal: 20, height: 50 }}>
            <Image
              style={{ width: 45, height: 45, borderRadius: 25 }}
              source={require('../../assets/icon_.png')}
            />
          </View>
        )}
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            flexDirection: 'row',
          }}
          onPress={onPress}
        >
          {save ? (
            <>
              <Text
                style={{
                  color: '#f48024',
                  fontWeight: '600',
                  fontSize: 15,
                  marginRight: 5,
                }}
              >
                salvar
              </Text>
              <Feather name="save" size={20} color="#f48024" />
            </>
          ) : (
            <>
              <Text
                style={{ color: '#f48024', fontWeight: '600', fontSize: 15 }}
              >
                Próxima
              </Text>
              <Feather name="chevron-right" size={20} color="#f48024" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
