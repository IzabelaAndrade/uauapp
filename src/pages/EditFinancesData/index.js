import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import BtnCancel from '../../components/BtnCancel';

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

export default function EditFinancesData({ navigation }) {
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const [visible, setvisible] = React.useState(false);
  const [list, setlist] = React.useState('');
  const [pikerType, setpikerType] = React.useState('');
  const [bank, setbank] = React.useState(register.bank);
  const [account, setaccount] = React.useState(register.accountType);
  const [agency, setagency] = React.useState(register.agency);
  const [operation, setoperation] = React.useState(register.operation);
  const [accountNumber, setaccountNumber] = React.useState(
    register.accountNumber
  );
  const [holder, setholder] = React.useState(register.holder);
  const [holderCPF, setholderCPF] = React.useState(register.holderCPF);

  const onPressDone = (type, value) => {
    switch (type) {
      case 'account':
        setaccount(value);
        break;

      case 'bank':
        setbank(value);
        break;

      default:
        break;
    }
    setvisible(false);
  };

  const onPressSave = () => {
    dispatch(modifyAccountType(value));
    dispatch(modifyBank(value));
    dispatch(modifyAgency(text));
    dispatch(modifyOperation(text));
    dispatch(modifyAccountNumber(text));
    dispatch(modifyHolder(text));
    dispatch(modifyHolderCPF(text));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight="save"
        // onPress={() => navigation.navigate('DocumentsForm')}
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
            onPress={() => {
              setlist(listbank);
              setpikerType('bank');
              setvisible(true);
            }}
            value={bank}
          />
          <FildInputForm
            lable="Tipo de Conta"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(listAccount);
              setpikerType('account');
              setvisible(true);
            }}
            value={account}
          />
          <FildInputForm
            lable="Agência"
            placeholder="Informe o Nº da agência"
            onChangeText={text => setagency(text)}
            value={agency}
          />
          <FildInputForm
            lable="Operação"
            placeholder="Informe a operação"
            onChangeText={text => setoperation(text)}
            value={operation}
          />
          <FildInputForm
            lable="Conta"
            placeholder="Informe o Nº da conta"
            onChangeText={text => setaccountNumber(text)}
            value={accountNumber}
          />
          <FildInputForm
            lable="Nome do Titular"
            placeholder="Informe o nome do titular"
            onChangeText={text => setholder(text)}
            value={holder}
          />
          <FildInputForm
            lable="CPF do Titular"
            placeholder="Informe o Nº do CPF do titular"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={text => setholderCPF(text)}
            value={Cpf.format(holderCPF)}
          />
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
      {visible ? (
        <SelectPiker
          list={list}
          onPress={value => {
            onPressDone(pikerType, value);
          }}
        />
      ) : null}
    </View>
  );
}
