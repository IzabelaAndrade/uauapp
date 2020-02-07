import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';
import { signOut } from '../../store/modules/auth/actions';

import HeaderForm from '../../components/HeaderForm';

// import { Container } from './styles';

export default function Profile({ navigation }) {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm navigation={navigation} back />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: '#bcbcbc' }}>Logado como:</Text>
        <Text style={{ fontSize: 20, fontWeight: '400', marginTop: 10 }}>
          {user.name}
        </Text>
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: '#bcbcbc',
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => dispatch(signOut())}
          >
            <AntDesign name="logout" size={20} color="#f48024" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
                marginLeft: 10,
                color: '#f48024',
              }}
            >
              Logar com outro usuário
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
