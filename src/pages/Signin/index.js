import React from 'react';
import { connect } from 'react-redux';
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
import axios from '../../utils/axios';

const { width, height } = Dimensions.get('window');
// import { Container } from './styles';

updateUser = (props, user) => {
  const { dispatch } = props;

  dispatch({
    type: 'UPDATE_USER',
    user,
  });
};

function Signin(props) {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, steLoading] = React.useState(false);
  const [iconShowPassword, setIconShowPassword] = React.useState('eye-off');

  function makeLogin(user, password) {
    props.navigation.navigate('Main');
  }

  async function makeLogin1(user, password) {
    let response = null;
    if (!user || !password) return;
    steLoading(true);
    try {
      response = await axios.post(
        '/Autenticador/AutenticarUsuarioApp',
        // response = await axios.post('/sessions',
        {
          login: user,
          // password: password
          senha: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-INTEGRATION-Authorization':
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..xaeDRaGWla0yPQOpQprQZw.HoH5ZvVk9TsYsPvztOvy8tmxdv4knYIUlNDpfQcgk2SihHc37tivf6gOyMTEyBnQ4ecSmD3WuVVP7RDsY3yijIEZJR_2Z9T7IqY_LeAMCm_WGJNZRHH0tz6ROEQxWusNp9LcO8J9VxdDw4kC0b7EdcPlBOL_6LWRPPILwkDoXOk.OPMAYw5707zX96zCtIlQKQ',
          },
        }
      );
    } catch (error) {
      console.log(error);
      steLoading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar acessar. Verifique se o Usuário e Senha informados estão corretos e tente novamente.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }

    // console.log(response.data)
    // updateUser(props, response.data);
    steLoading(false);
    console.log(response.data[0].Usuario[1]);
    // console.log(password)
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
      {/* <View
        style={{
          marginTop: Constants.statusBarHeight,
          height: 70 + Constants.statusBarHeight
        }}
      >
        <View style={{ backgroundColor: '#fff'}}>


        </View>

      </View> */}

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
            onChangeText={text => setUser(text)}
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
              onChangeText={text => setPassword(text)}
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
            onPress={() => makeLogin(user, password)}
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

export default connect()(Signin);
