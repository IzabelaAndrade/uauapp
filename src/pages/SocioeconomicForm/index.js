import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
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

const maritalStatusList = [
  'Selecione uma opção',
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
];

const homeList = [
  'Selecione uma opção',
  'Própria - Financiada',
  'Própria - Quitada',
  'Alugada',
  'Compartilhada (amigo ou parente)',
];

const transportList = [
  'Selecione uma opção',
  'Moto - Financiada',
  'Moto - Quitada',
  'Carro - Financiado',
  'Carro - Quitado',
  'Transporte Público',
  'Outros',
];

const habilitationList = [
  'Selecione uma opção',
  'A',
  'B',
  'AB',
  'D',
  'E',
  'Não Possui',
];

export default function SocioeconomicForm({ navigation }) {
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState('');
  const [visible, setvisible] = React.useState(false);

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const onPressDone = (type, value) => {
    switch (type) {
      case 'maritalStatus':
        dispatch(modifyMaritalStatus(value));
        break;

      case 'home':
        dispatch(modifyHome(value));
        break;

      case 'transport':
        dispatch(modifyTransport(value));
        break;

      case 'habilitation':
        dispatch(modifyHabilitation(value));
        break;

      default:
        break;
    }
    setvisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight="next"
        onPress={() => navigation.navigate('ReferenceForm')}
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
            value={register.maritalStatus}
          />
          <FildInputForm
            lable="Número de Dependentes"
            keyboardType="numeric"
            maxLength={2}
            placeholder="Informe o nº de dependentes"
            onChangeText={text => dispatch(modifyDependents(text))}
            value={register.dependents}
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
            value={register.home}
          />
          <FildInputForm
            lable="CEP"
            placeholder="Informe o CEP"
            keyboardType="numeric"
            maxLength={9}
            onChangeText={text => dispatch(modifyPostalCode(text))}
            value={register.postalCode}
          />
          <FildInputForm
            lable="Bairro"
            placeholder="Informe o bairro"
            onChangeText={text => dispatch(modifyNeighborhood(text))}
            value={register.neighborhood}
          />
          <FildInputForm
            lable="Logradouro"
            placeholder="Informe o logradouro"
            onChangeText={text => dispatch(modifyAddress(text))}
            value={register.address}
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
            value={register.transport}
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
            value={register.habilitation}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: 20,
              height: 50,
              width: 80,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('ReferenceForm')}
          >
            <Ionicons
              name="ios-arrow-round-forward"
              size={40}
              color="#f48024"
            />
          </TouchableOpacity>
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
