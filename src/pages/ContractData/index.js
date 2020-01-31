import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Date from '../../utils/Date';

import {
  modifyName,
  modifyRG,
  modifyCPF,
  modifyVoterTitle,
  modifyEmail,
  modifyBirthday,
  modifyPhone,
  modifyEducation,
  modifyHability,
  modifyReference,
  modifyPhoto,
  modifyShirt,
  modifyPants,
  modifyShoes,
} from '../../store/modules/register/actions';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import MultiSelectPiker from '../../components/MultiSelectPiker';
import BtnCancel from '../../components/BtnCancel';

import { paymentList, bonusList, typeJobList } from '../../utils/List';

export default function ContractData({ navigation }) {
  const register = useSelector(state => state.register);

  // console.log(navigation.state.params.screen);
  const oldScreen = navigation.state.params
    ? navigation.state.params.screen
    : null;
  const [visible, setvisible] = React.useState(false);
  const [visiblebonus, setvisiblebonus] = React.useState(false);
  const [list, setlist] = React.useState('');
  const [pikerType, setpikerType] = React.useState([]);

  const [typeJob, settypeJob] = React.useState(register.typeJob);
  const [payment, setpayment] = React.useState(register.payment);
  const [helpValue, sethelpValue] = React.useState(register.helpValue);
  const [cotractDate, setcotractDate] = React.useState('');
  const [bonus, setbonus] = React.useState([]);
  const [paymentValue, setpaymentValue] = React.useState(register.paymentValue);

  const dispatch = useDispatch();

  const onPressSave = () => {
    dispatch(modifyName(text));
    dispatch(modifyRG(text));
    dispatch(modifyCPF(text));
    dispatch(modifyVoterTitle(text));
    dispatch(modifyBirthday(text));
    dispatch(modifyEmail(text));
    dispatch(modifyPhone(text));
    dispatch(modifyReference(text));
    dispatch(modifyEducation(value));
    dispatch(modifyShirt(value));
    dispatch(modifyPants(value));
    dispatch(modifyShoes(value));
    dispatch(modifyHability(selectedList));
  };

  const onPressDone = (type, value) => {
    switch (type) {
      case 'typeJob':
        settypeJob(value);
        break;
      case 'payment':
        setpayment(value);
        break;

      default:
        break;
    }
    setvisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm navigation={navigation} back iconRight="edit" />
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
            Dados de Contrato
          </Text>
          <FildInputForm
            lable="Regime de Trabalho"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(typeJobList);
              setvisible(true);
              setpikerType('typeJob');
            }}
            value={typeJob}
          />
          <FildInputForm
            lable="Remuneração"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(paymentList);
              setvisible(true);
              setpikerType('payment');
            }}
            value={payment}
          />
          <FildInputForm
            lable="Valor"
            placeholder="Informe o valor do salário"
            onChangeText={text => setpaymentValue(text)}
            value={paymentValue}
          />
          <FildInputForm
            lable="Benefícios Salariais"
            placeholder="Selecione uma ou mais opções"
            list
            onPress={() => setvisiblebonus(true)}
            value={bonus.length < 1 ? '' : bonus.join(', ')}
          />
          <FildInputForm
            lable="Ajuda de Custo"
            placeholder="Informe o valor"
            onChangeText={text => sethelpValue(text)}
            value={helpValue}
          />
          <FildInputForm
            lable="Data de Contratação"
            keyboardType="numeric"
            maxLength={10}
            placeholder="Informe a data de contratação"
            onChangeText={text => setcotractDate(text)}
            value={Date.format(cotractDate)}
          />
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>

      {visible ? (
        <SelectPiker
          list={list}
          // onPress={value => {
          //   dispatch(modifyEducation(value));
          //   // seteducation(value);
          //   setvisible(false);
          // }}
          onPress={value => onPressDone(pikerType, value)}
        />
      ) : null}
      <MultiSelectPiker
        show={visiblebonus}
        dataList={bonusList}
        selectedList={bonus}
        onPressConfirm={selectedList => {
          setbonus(selectedList);
          setvisiblebonus(false);
        }}
      />
    </View>
  );
}
