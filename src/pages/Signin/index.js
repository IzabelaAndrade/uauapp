import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';
import { signInRequest } from '../../store/modules/auth/actions';

const { width } = Dimensions.get('window');

const stylesSignIn = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: '#f48024',
  },
  headerText: {
    color: '#222426',
    marginLeft: 30,
    marginTop: 30,
    fontSize: 19,
    fontWeight: '400',
  },
  containerForm: {
    flex: 1,
    justifyContent: 'center',
  },
  boxForm: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgLogo: { width: 65, height: 65 },
  inputUser: {
    marginTop: 30,
    height: 40,
    borderColor: '#f48024',
    borderBottomWidth: 1,
    width: width - 40,
    fontSize: 20,
  },
  inputPass: {
    marginTop: 15,
    borderColor: '#f48024',
    borderBottomWidth: 1,
    width: width - 40,
    flexDirection: 'row',
  },
  inputPassText: {
    height: 40,
    flex: 1,
    fontSize: 20,
  },
  inputPassBtn: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPassBtnIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#f48024',
  },
  btnSubmit: {
    marginTop: 50,
    height: 40,
    width: 180,
    backgroundColor: '#f48024',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnSubmitText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

function Signin() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [iconShowPassword, setIconShowPassword] = React.useState('eye-off');

  function handleSubmit() {
    dispatch(signInRequest(user, password));
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
    <View style={stylesSignIn.container}>
      <View style={stylesSignIn.statusBar} />
      <Text style={stylesSignIn.headerText}>Login</Text>
      <KeyboardAvoidingView
        style={stylesSignIn.containerForm}
        behavior="padding"
        enabled
      >
        <View style={stylesSignIn.boxForm}>
          <Image
            style={stylesSignIn.imgLogo}
            source={require('../../assets/icon.png')}
          />
          <TextInput
            style={stylesSignIn.inputUser}
            maxLength={40}
            placeholder="Usuário"
            placeholderTextColor="#bcbcbc"
            onChangeText={setUser}
            value={user}
          />

          <View style={stylesSignIn.inputPass}>
            <TextInput
              style={stylesSignIn.inputPassText}
              maxLength={20}
              secureTextEntry={secureTextEntry}
              placeholder="Senha"
              placeholderTextColor="#bcbcbc"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={stylesSignIn.inputPassBtn}
              onPress={() => showPassword()}
            >
              <Feather
                name={iconShowPassword}
                style={stylesSignIn.inputPassBtnIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={stylesSignIn.btnSubmit}
            onPress={() => handleSubmit()}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={stylesSignIn.btnSubmitText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Signin;
