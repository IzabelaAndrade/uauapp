import React from 'react';
import { View, Image, Alert, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import MultiSelectPiker from '../../components/MultiSelectPiker';
import FullLoading from '../../components/FullLoading';

import api from '../../services/api';
// import { Container } from './styles';
const permissionList = [
  'Cadastro',
  'Gestão de Pessoas',
  'Financeiro Descontos',
  'Financeiro Lançamentos',
  'Financeiro Fechamento',
  'Financeiro Extrato Funcionário',
  'Permissões de Usuário',
];

export default function Settings({ navigation }) {
  const { person } = navigation.state.params;
  const [permission, setPermission] = React.useState(() => {
    if (!person.permission || person.permission.permission.length < 1) {
      return [];
    }
    return person.permission.permission;
  });
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const user = useSelector(state => state.auth);
  const img = person.Files.find(element => element.type === 'photo');

  const onPressSave = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await api.put(
        '/person',
        {
          uuid: person.uuid,
          permission,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar salvar as permissões, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }
    // dispatch(modifyName(response.data.person.name));

    Alert.alert(
      '',
      'As permissões foram salvas com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            navigation.navigate('Home');
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        back
        iconRight="save"
        onPressBack={() => navigation.goBack()}
        onPress={() => onPressSave()}
      />
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center',
        }}
        source={img ? { uri: img.url } : require('../../assets/avatar.png')}
      />
      <Text
        style={{
          fontWeight: '500',
          fontSize: 18,
          alignSelf: 'center',
          marginVertical: 20,
        }}
      >
        {person.name}
      </Text>
      <FildInputForm
        required
        lable="Permissões"
        placeholder="Selecione uma ou mais opções"
        list
        multiselector
        onPress={() => setVisible(true)}
        value={permission.length < 1 ? '' : permission.join(', ')}
        // value={register.hability.length < 1 ? '' : register.hability.join(', ')}
      />
      <MultiSelectPiker
        show={visible}
        dataList={permissionList}
        selectedList={permission}
        onPressConfirm={selectedList => {
          setPermission(selectedList);
          // dispatch(modifyHability(selectedList));
          setVisible(false);
        }}
      />

      <FullLoading loading={loading} />
    </View>
  );
}
