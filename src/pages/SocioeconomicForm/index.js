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
  modifyChildren,
  modifyDependents,
  modifySpouse,
  modifyHome,
  modifyNeighborhood,
  modifyStreet,
  modifyFinances,
  modifyDebtValue,
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
  'Própria',
  'Alugada',
  'Compartilhada (amigo ou parente)',
];

const spouseList = ['Selecione uma opção', 'Empregado', 'Desempregado'];

const financesList = [
  'Selecione uma opção',
  'Possiu Dívidas ou Financiameto',
  'Não Possui Dívidas ou Financiameto',
];

const transportList = [
  'Selecione uma opção',
  'Moto',
  'Carro',
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
  const [maritalStatus, setmaritalStatus] = React.useState('');
  const [children, setchildren] = React.useState('');
  const [street, setstreet] = React.useState('');
  const [home, sethome] = React.useState('');
  const [neighborhood, setneighborhood] = React.useState('');
  const [finances, setfinances] = React.useState('');
  const [debtValue, setdebtValue] = React.useState('');
  const [dependents, setdependents] = React.useState('');
  const [spouse, setspouse] = React.useState('');
  const [transport, settransport] = React.useState('');
  const [habilitation, sethabilitation] = React.useState('');
  const [pikerType, setpikerType] = React.useState('');
  const [visible, setvisible] = React.useState(false);

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const onPressDone = (type, value) => {
    switch (type) {
      case 'maritalStatus':
        // setmaritalStatus(value);
        dispatch(modifyMaritalStatus(value));
        break;

      case 'spouse':
        dispatch(modifySpouse(value));
        // setspouse(value);
        break;

      case 'home':
        dispatch(modifyHome(value));
        // sethome(value);
        break;

      case 'finances':
        dispatch(modifyFinances(value));
        // setfinances(value);
        break;

      case 'transport':
        dispatch(modifyTransport(value));
        // settransport(value);
        break;

      case 'habilitation':
        dispatch(modifyHabilitation(value));
        // sethabilitation(value);
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
            onPress={() => {
              setlist(maritalStatusList);
              setvisible(true);
              setpikerType('maritalStatus');
            }}
            value={register.maritalStatus}
          />
          <FildInputForm
            lable="Número de Filhos"
            keyboardType="numeric"
            maxLength={2}
            placeholder="Informe o nº de filhos"
            // onChangeText={text => setchildren(text)}
            // value={children}
            onChangeText={text => dispatch(modifyChildren(text))}
            value={register.children}
          />
          <FildInputForm
            lable="Número de Dependentes"
            keyboardType="numeric"
            maxLength={2}
            placeholder="Informe o nº de dependentes"
            // onChangeText={text => setdependents(text)}
            onChangeText={text => dispatch(modifyDependents(text))}
            value={register.dependents}
          />
          <FildInputForm
            lable="Ocupação do Conjuge"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(spouseList);
              setvisible(true);
              setpikerType('spouse');
            }}
            value={register.spouse}
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
            value={register.home}
          />
          <FildInputForm
            lable="Bairro"
            placeholder="Informe o bairro"
            // onChangeText={text => setneighborhood(text)}
            onChangeText={text => dispatch(modifyNeighborhood(text))}
            value={register.neighborhood}
          />
          <FildInputForm
            lable="Logradouro"
            placeholder="Informe o logradouro"
            // onChangeText={text => setstreet(text)}
            onChangeText={text => dispatch(modifyStreet(text))}
            value={register.street}
          />

          <FildInputForm
            lable="Situação Financeira"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(financesList);
              setvisible(true);
              setpikerType('finances');
            }}
            value={register.finances}
          />
          <FildInputForm
            lable="Valor Mensal da Parcela"
            placeholder="Informe o valor"
            keyboardType="numeric"
            maxLength={10}
            // onChangeText={text => setdebtValue(text)}
            onChangeText={text => dispatch(modifyDebtValue(text))}
            value={register.debtValue}
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
            value={register.transport}
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
