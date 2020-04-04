import React, { useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';

import {
  modifyBank,
  modifyAccountType,
  modifyAgency,
  modifyOperation,
  modifyAccountNumber,
  modifyHolder,
  modifyHolderCPF,
} from '../../store/modules/register/actions';

import { listbank, listAccount } from '../../utils/List';

export default function FinancesDataForm({ navigation }) {
  const register = useSelector(state => state.register);

  const [visible, setvisible] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState('');
  const [bank, setbank] = React.useState('');
  const [account, setaccount] = React.useState('');
  const [agency, setagency] = React.useState('');
  const [operation, setoperation] = React.useState('');
  const [accountNumber, setaccountNumber] = React.useState('');
  const [holder, setholder] = React.useState(register.name);
  const [holderCPF, setholderCPF] = React.useState(register.cpf);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!register.holderCPF) {
    //   dispatch(modifyHolder(register.cpf));
    // }
    // if (user.permission || user.permission.length > 1) {
    //   navigation.navigate('Signin');
    // }
  });

  const onPressDone = (type, value) => {
    switch (type) {
      case 'account':
        dispatch(modifyAccountType(value));
        // setaccount(value);
        break;

      case 'bank':
        // setbank(value);
        dispatch(modifyBank(value));
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
        onPress={() => navigation.navigate('DocumentsForm')}
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
            Dados Bancários
          </Text>
          <FildInputForm
            lable="Banco"
            placeholder="Selecione uma opção"
            list
            androidList={listbank}
            onValueChange={value => onPressDone('bank', value)}
            onPress={() => {
              setlist(listbank);
              setpikerType('bank');
              setvisible(true);
            }}
            value={register.bank}
          />
          <FildInputForm
            lable="Tipo de Conta"
            placeholder="Selecione uma opção"
            list
            androidList={listAccount}
            onValueChange={value => onPressDone('account', value)}
            onPress={() => {
              setlist(listAccount);
              setpikerType('account');
              setvisible(true);
            }}
            value={register.accountType}
          />
          <FildInputForm
            lable="Agência"
            placeholder="Informe o Nº da agência"
            // onChangeText={text => setagency(text)}
            onChangeText={text => dispatch(modifyAgency(text))}
            value={register.agency}
          />
          <FildInputForm
            lable="Operação"
            placeholder="Informe a operação"
            // onChangeText={text => setoperation(text)}
            onChangeText={text => dispatch(modifyOperation(text))}
            value={register.operation}
          />
          <FildInputForm
            lable="Conta"
            placeholder="Informe o Nº da conta"
            // onChangeText={text => setaccountNumber(text)}
            onChangeText={text => dispatch(modifyAccountNumber(text))}
            value={register.accountNumber}
          />
          <FildInputForm
            lable="Nome do Titular"
            placeholder="Informe o nome do titular"
            onChangeText={text => setholder(text)}
            // onChangeText={text => dispatch(modifyHolder(text))}
            // value={register.holder}
            value={holder}
            onEndEditing={() => dispatch(modifyHolder(holder))}
          />
          <FildInputForm
            lable="CPF do Titular"
            placeholder="Informe o Nº do CPF do titular"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={text => setholderCPF(text)}
            value={Cpf.format(holderCPF)}
            onEndEditing={() => dispatch(modifyHolderCPF(holderCPF))}
            // onChangeText={text => dispatch(modifyHolderCPF(text))}
            // value={Cpf.format(register.holderCPF)}
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
            onPress={() => navigation.navigate('DocumentsForm')}
          >
            <Ionicons
              name="ios-arrow-round-forward"
              size={40}
              color="#f48024"
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => {
          // dispatch(modifyEducation(value));
          onPressDone(pikerType, value);

          // setvisible(false);
        }}
      />
    </View>
  );
}
