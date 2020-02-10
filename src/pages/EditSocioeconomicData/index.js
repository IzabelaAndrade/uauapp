import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  modifyMaritalStatus,
  modifyDependents,
  modifyHome,
  modifyPostalCode,
  modifyNeighborhood,
  modifyAddress,
  modifyTransport,
  modifyHabilitation,
} from '../../store/modules/register/actions';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import BtnCancel from '../../components/BtnCancel';
import FullLoading from '../../components/FullLoading';

import api from '../../services/api';

import {
  maritalStatusList,
  homeList,
  transportList,
  habilitationList,
} from '../../utils/List';

export default function EditSocioeconomicData({ navigation }) {
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState('');
  const [visible, setvisible] = React.useState(false);

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const [loading, setloading] = React.useState(false);
  const [maritalStatus, setmaritalStatus] = React.useState(
    register.maritalStatus
  );
  const [dependents, setdependents] = React.useState(register.dependents);
  const [home, sethome] = React.useState(register.home);
  const [postalCode, setpostalCode] = React.useState(register.postalCode);
  const [neighborhood, setneighborhood] = React.useState(register.neighborhood);
  const [address, setaddress] = React.useState(register.address);
  const [transport, settransport] = React.useState(register.transport);
  const [habilitation, sethabilitation] = React.useState(register.habilitation);

  const onPressDone = (type, value) => {
    switch (type) {
      case 'maritalStatus':
        setmaritalStatus(value);
        break;

      case 'home':
        sethome(value);
        break;

      case 'transport':
        settransport(value);
        break;

      case 'habilitation':
        sethabilitation(value);
        break;

      default:
        break;
    }
    setvisible(false);
  };

  const onPressSave = async () => {
    setloading(true);
    let response = null;
    try {
      response = await api.put(
        '/person',
        {
          uuid: register.uuid,
          maritalStatus,
          dependents,
          home,
          postalCode,
          neighborhood,
          address,
          transport,
          habilitation,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar realizar o cadastro, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }

    dispatch(modifyMaritalStatus(response.data.person.marital_status));
    dispatch(modifyHome(response.data.person.home));
    dispatch(modifyTransport(response.data.person.transport));
    dispatch(modifyHabilitation(response.data.person.habilitation));
    dispatch(modifyDependents(response.data.person.dependents));
    dispatch(modifyPostalCode(response.data.person.postal_code));
    dispatch(modifyNeighborhood(response.data.person.neighborhood));
    dispatch(modifyAddress(response.data.person.address));

    Alert.alert(
      '',
      'Os dados foram alterados com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setloading(false);
            navigation.goBack();
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
        screen="ReferenceForm"
        back
        iconRight="save"
        onPress={onPressSave}
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 25,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          >
            Dados Socio-econômicos
          </Text>
          <FildInputForm
            lable="Estado Civil"
            placeholder="Selecione uma opção"
            list
            androidList={maritalStatusList}
            onValueChange={value => onPressDone('maritalStatus', value)}
            onPress={() => {
              setlist(maritalStatusList);
              setvisible(true);
              setpikerType('maritalStatus');
            }}
            value={maritalStatus}
          />
          <FildInputForm
            lable="Número de Dependentes"
            keyboardType="numeric"
            maxLength={2}
            placeholder="Informe o nº de dependentes"
            onChangeText={text => setdependents(text)}
            value={dependents}
          />
          <FildInputForm
            lable="Tipo de Moradia"
            placeholder="Selecione uma opção"
            list
            androidList={homeList}
            onValueChange={value => onPressDone('home', value)}
            onPress={() => {
              setlist(homeList);
              setvisible(true);
              setpikerType('home');
            }}
            value={home}
          />
          <FildInputForm
            lable="CEP"
            placeholder="Informe o CEP"
            keyboardType="numeric"
            maxLength={9}
            onChangeText={text => setpostalCode(text)}
            value={postalCode}
          />
          <FildInputForm
            lable="Bairro"
            placeholder="Informe o bairro"
            onChangeText={text => setneighborhood(text)}
            value={neighborhood}
          />
          <FildInputForm
            lable="Logradouro"
            placeholder="Informe o logradouro"
            onChangeText={text => setaddress(text)}
            value={address}
          />
          <FildInputForm
            lable="Meio de Transporte"
            placeholder="Selecione uma opção"
            list
            androidList={transportList}
            onValueChange={value => onPressDone('transport', value)}
            onPress={() => {
              setlist(transportList);
              setvisible(true);
              setpikerType('transport');
            }}
            value={transport}
          />
          <FildInputForm
            lable="Habilitação"
            placeholder="Selecione uma opção"
            list
            androidList={habilitationList}
            onValueChange={value => onPressDone('habilitation', value)}
            onPress={() => {
              setlist(habilitationList);
              setvisible(true);
              setpikerType('habilitation');
            }}
            value={habilitation}
          />
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => onPressDone(pikerType, value)}
      />
      <FullLoading loading={loading} />
    </View>
  );
}
