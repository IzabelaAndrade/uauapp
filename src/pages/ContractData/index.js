import React, { useEffect } from 'react';
import {
  View,
  Alert,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../services/api';

import Date from '../../utils/Date';

import {
  modifyContractType,
  modifyJobRules,
  modifyPayment,
  modifyPaymentValue,
  modifyBonus,
  modifyCotractDate,
} from '../../store/modules/register/actions';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import MultiSelectPiker from '../../components/MultiSelectPiker';
import BtnCancel from '../../components/BtnCancel';
import FullLoading from '../../components/FullLoading';

import { paymentList, bonusList, typeJobList } from '../../utils/List';

export default function ContractData({ navigation }) {
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);
  const { uuid } = navigation.state.params;

  const [visible, setvisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [visiblebonus, setvisiblebonus] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState([]);

  const [button, setbutton] = React.useState('edit');
  const [employee, setemployee] = React.useState(null);
  const [contractDate, setcontractDate] = React.useState('');
  const [changeData, setChangeData] = React.useState('');
  const [bonus, setbonus] = React.useState([]);
  const [helpValue, sethelpValue] = React.useState(null);
  const [typeJob, settypeJob] = React.useState(null);
  const [jobRules, setjobRules] = React.useState(null);
  const [payment, setpayment] = React.useState(null);
  const [paymentValue, setpaymentValue] = React.useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const uuidUser = navigation.state.params.uuid;
    // setuuid(uuidUser);
    async function getContractUser() {
      let response = null;
      try {
        response = await api.get(`/workcontract?user=${uuidUser}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(signOut());
          // setRefresh(false);
        }
        console.log(error.response);
        return error;
      }
      console.log(response.data);
      setemployee(response.data);
      if (response.data) {
        const data = moment(response.data.admission_date, 'YYYY-MM-DD').format(
          'DD/MM/YYYY'
        );
        setcontractDate(data || '');
        setbonus(response.data.benefits);
        sethelpValue(response.data.benefits_value);
        settypeJob(response.data.contract_type);
        setjobRules(response.data.job_role);
        setpayment(response.data.payment_type);
        setpaymentValue(response.data.payment_value);
        setChangeData(response.data.cancel_date);
      } else {
        setbutton('save');
      }
    }
    getContractUser();
  }, [navigation.state.params, user]);

  const onPressSave = async type => {
    if (button === 'edit') {
      setbutton('save');
      return;
    }
    if (!contractDate || !typeJob || !jobRules || !payment || !paymentValue) {
      if (type === 'new' && !changeData) {
        Alert.alert(
          'Ops!',
          'Preencha todos os campos obrigatórios.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return;
      }
      Alert.alert(
        'Ops!',
        'Preencha todos os campos obrigatórios.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    setloading(true);
    let response = null;
    try {
      response = await api.post(
        `/workcontract`,
        {
          user: uuid,
          contractType: typeJob,
          jobRules,
          payment,
          paymentValue,
          bonus,
          bonusValue: helpValue,
          contractDate,
          cancelDate: changeData,
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
        'Houve um erro ao salvar os dados, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
      // throw error;
    }

    // dispatch(modifyContractType(text));
    // dispatch(modifyJobRules(text));
    // dispatch(modifyPayment(text));
    // dispatch(modifyPaymentValue(text));
    // dispatch(modifyBonus(text));
    // dispatch(modifyContractDate(text));

    // console.log(response.data);

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
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight={!contractDate && !paymentValue ? '' : button}
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
            Dados de Contrato
          </Text>
          <FildInputForm
            lable="Regime de Trabalho"
            placeholder="Selecione uma opção"
            list
            required
            disabled={button === 'edit'}
            androidList={typeJobList}
            onValueChange={value => onPressDone('typeJob', value)}
            onPress={() => {
              setlist(typeJobList);
              setvisible(true);
              setpikerType('typeJob');
            }}
            value={typeJob}
          />
          <FildInputForm
            lable="Função"
            placeholder="Informe a função"
            required
            disabled={button === 'edit'}
            onChangeText={text => setjobRules(text)}
            value={jobRules}
          />
          <FildInputForm
            lable="Remuneração"
            placeholder="Selecione uma opção"
            disabled={button === 'edit'}
            required
            list
            androidList={paymentList}
            onValueChange={value => onPressDone('payment', value)}
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
            required
            disabled={button === 'edit'}
            onChangeText={text => setpaymentValue(text)}
            value={paymentValue}
          />
          <FildInputForm
            lable="Benefícios Salariais"
            placeholder="Selecione uma ou mais opções"
            disabled={button === 'edit'}
            list
            multiselector
            onPress={() => setvisiblebonus(true)}
            value={bonus.length < 1 ? '' : bonus.join(', ')}
          />
          <FildInputForm
            lable="Ajuda de Custo"
            placeholder="Informe o valor"
            disabled={button === 'edit'}
            onChangeText={text => sethelpValue(text)}
            value={helpValue}
          />
          <FildInputForm
            lable="Data de Contratação"
            keyboardType="numeric"
            required
            maxLength={10}
            placeholder="Informe a data de contratação"
            disabled={button === 'edit'}
            onChangeText={text => setcontractDate(text)}
            value={Date.format(contractDate)}
          />
          {employee ? (
            <FildInputForm
              lable="Data de Alteração"
              keyboardType="numeric"
              required
              maxLength={10}
              placeholder="Informe a data"
              disabled={button === 'edit'}
              onChangeText={text => setChangeData(text)}
              value={Date.format(changeData)}
            />
          ) : null}
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: '#bcbcbc',
              borderBottomWidth: 0.5,
            }}
          >
            {!employee ? (
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  width: 150,
                  height: 45,
                  borderRadius: 25,
                  marginVertical: 15,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => onPressSave('new')}
              >
                <Text
                  style={{ color: '#fff', fontWeight: '400', fontSize: 19 }}
                >
                  Contratar
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  width: 150,
                  height: 45,
                  borderRadius: 25,
                  marginVertical: 15,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('LayOff', { uuid });
                }}
              >
                <Text
                  style={{ color: '#fff', fontWeight: '400', fontSize: 19 }}
                >
                  Desligar
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => onPressDone(pikerType, value)}
      />
      <MultiSelectPiker
        show={visiblebonus}
        dataList={bonusList}
        selectedList={bonus}
        onPressConfirm={selectedList => {
          setbonus(selectedList);
          setvisiblebonus(false);
        }}
      />
      <FullLoading loading={loading} />
    </View>
  );
}
