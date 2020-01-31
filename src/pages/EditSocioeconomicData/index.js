import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';

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

  const onPressSave = () => {
    dispatch(modifyMaritalStatus(value));
    dispatch(modifyHome(value));
    dispatch(modifyTransport(value));
    dispatch(modifyHabilitation(value));
    dispatch(modifyDependents(text));
    dispatch(modifyPostalCode(text));
    dispatch(modifyNeighborhood(text));
    dispatch(modifyAddress(text));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight="save"
        // onPress={() => navigation.navigate('ReferenceForm')}
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
      {visible ? (
        <SelectPiker
          list={list}
          onPress={value => onPressDone(pikerType, value)}
        />
      ) : null}
    </View>
  );
}
