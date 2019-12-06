import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';
import { signInRequest } from '../../store/modules/auth/actions';

const { width, height } = Dimensions.get('window');
// import { Container } from './styles';

function Signin(props) {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [iconShowPassword, setIconShowPassword] = React.useState('eye-off');

  function handleSubmit() {
    dispatch(signInRequest(user, password));
    // props.navigation.navigate('Main');
  }

  function showPassword() {
    setSecureTextEntry(!secureTextEntry);
    if (iconShowPassword === 'eye') {
      setIconShowPassword('eye-off');
    } else {
      setIconShowPassword('eye');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#f48024" />
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: '#f48024',
        }}
      />
      <Text
        style={{
          color: '#222426',
          marginLeft: 30,
          marginTop: 30,
          fontSize: 19,
          fontWeight: '400',
        }}
      >
        Login
      </Text>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        behavior="padding"
        enabled
      >
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Image
            style={{ width: 65, height: 65 }}
            source={require('../../assets/logoavanci.png')}
          />
          <TextInput
            style={{
              marginTop: 30,
              height: 40,
              borderColor: '#f48024',
              borderBottomWidth: 1,
              width: width - 40,
              fontSize: 20,
            }}
            maxLength={40}
            placeholder="Usuário"
            placeholderTextColor="#bcbcbc"
            onChangeText={setUser}
            value={user}
          />

          <View
            style={{
              marginTop: 15,
              borderColor: '#f48024',
              borderBottomWidth: 1,
              width: width - 40,
              flexDirection: 'row',
            }}
          >
            <TextInput
              style={{
                height: 40,
                // width: width - 40,
                flex: 1,
                fontSize: 20,
              }}
              maxLength={20}
              secureTextEntry={secureTextEntry}
              placeholder="Senha"
              placeholderTextColor="#bcbcbc"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={{
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => showPassword()}
            >
              <Feather
                name={iconShowPassword}
                size={20}
                color="#f48024"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 50,
              height: 40,
              width: 180,
              backgroundColor: '#f48024',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={() => handleSubmit()}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>
                Entrar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Signin;
