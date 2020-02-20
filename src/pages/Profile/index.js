import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';

import { signOut } from '../../store/modules/auth/actions';
import FildInputForm from '../../components/FildInputForm';
import FullLoading from '../../components/FullLoading';

import HeaderForm from '../../components/HeaderForm';

// import { Container } from './styles';

export default function Profile({ navigation }) {
  const user = useSelector(state => state.auth);
  const [password, setPassword] = React.useState('');
  const [repetePassword, setRepetePassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  async function onPressDone() {
    if (!password || !repetePassword) {
      Alert.alert(
        'Ops!',
        'Todos os campos com * devem ser preenchidos.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    if (password !== repetePassword) {
      Alert.alert(
        'Ops!',
        'Os valores informados devem ser iguais.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    setLoading(true);
    try {
      await api.put(
        '/users',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Ops!',
        'Alteração não realizada, verifique sua conexão com a internet e tente novamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false);
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }
    Alert.alert(
      '',
      'Alteração realizada com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            dispatch(signOut());
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        back
        iconRight={password || repetePassword ? 'save' : ''}
        onPressBack={() => navigation.goBack()}
        onPress={() => onPressDone()}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: '#f48024' }}>Logado como:</Text>
        <Text style={{ fontSize: 22, fontWeight: '400', marginTop: 10 }}>
          {user.name}
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: '#bcbcbc',
          marginVertical: 20,
        }}
      />
      <Text style={{ color: '#f48024', marginHorizontal: 20 }}>
        Alterar senha:
      </Text>
      <FildInputForm
        lable="Nova senha"
        placeholder="Informe a senha"
        maxLength={20}
        secureTextEntry
        required
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <FildInputForm
        lable="Repetir Nova senha"
        placeholder="Informe a senha"
        maxLength={20}
        secureTextEntry
        required
        onChangeText={text => setRepetePassword(text)}
        value={repetePassword}
      />

      <View
        style={
          {
            // borderTopWidth: 0.5,
            // borderColor: '#bcbcbc',
            // marginVertical: 20,
          }
        }
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
      <FullLoading loading={loading} />
    </View>
  );
}
