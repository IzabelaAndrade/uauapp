import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';

import Date from '../../utils/Date';
import Money from '../../utils/Money';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import ModalSearch from '../../components/ModalSearch';
import FullLoading from '../../components/FullLoading';
import api from '../../services/api';

const formOfPayment = ['', 'Dinheiro', 'Transferência', 'Outros'];
const Account = [
  '',
  'Banco do Brasil',
  'Caixa Econômica',
  'Caixa Econômica - Motorista',
  'Outros',
];

const discountType = [
  '',
  'Pagamento de Salário',
  'Pagamento de Medição',
  'Pagamento de Reembolso',
  'Pagamento de Bônus',
  'Pagamento de Comissão',
];

export default function PaymentForm({ navigation }) {
  const dataPayment = navigation.state.params.data;
  console.log(dataPayment);

  const [type, setType] = React.useState('');
  const [value, setValue] = React.useState('');
  const [formPayment, setFormPayment] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectPickerItens, setSelectPickerItens] = React.useState([]);
  const [seterSelectPicker, setSeterSelectPicker] = React.useState(null);
  const [visible, setvisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [beneficiaries, setBeneficiaries] = React.useState([]);
  const [beneficiary, setBeneficiary] = React.useState('');
  const [modalSearchShow, setModalSearchShow] = React.useState(false);

  const user = useSelector(state => state.auth);

  useEffect(() => {
    // async function getAllInterviewed() {
    //   let response = null;
    //   try {
    //     response = await api.get('/users', {
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     return error;
    //   }
    //   return setBeneficiaries(response.data);
    // }
    // getAllInterviewed();
  }, [user]);

  async function save() {
    if (
      !dataPayment.user_uuid ||
      !date ||
      !type ||
      !dataPayment.balance ||
      !formPayment
    ) {
      Alert.alert(
        'Ops!',
        'Todos os campos com * devem ser preenchidos.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    if (formPayment === 'Transferência' && !account) {
      Alert.alert(
        'Ops!',
        'Todos os campos com * devem ser preenchidos.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    setLoading(true);
    try {
      await api.post(
        '/financerecord',
        {
          user: dataPayment.user_uuid,
          date,
          description: note,
          value: dataPayment.balance,
          type,
          transaction_type: formPayment,
          account,
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
        'Operação não realizada, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }
    Alert.alert(
      '',
      'Operação realizada com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }
  const onPressDone = (type, value) => {
    switch (type) {
      case 'setBeneficiary':
        setBeneficiary(value);
        break;

      case 'setType':
        setType(value);
        break;

      case 'setFormPayment':
        setFormPayment(value);
        break;

      case 'setAccount':
        setAccount(value);
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
        back
        iconRight="save"
        onPress={() => save()}
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <FildInputForm
            required
            disabled
            lable="Beneficiário"
            placeholder="Selecione uma opção"
            // list
            // multiselector
            // androidList={beneficiaries}
            // onValueChange={data => onPressDone('setBeneficiary', data)}
            onPress={() => {
              setModalSearchShow(true);
            }}
            value={dataPayment.user_name}
          />
          <FildInputForm
            required
            lable="Tipo do pagamento"
            placeholder="Selecione uma opção"
            list
            androidList={discountType}
            onValueChange={data => onPressDone('setType', data)}
            onPress={() => {
              setSelectPickerItens(discountType);
              setSeterSelectPicker('setType');
              setvisible(true);
            }}
            value={type}
          />
          <FildInputForm
            required
            lable="Forma de pagamento"
            placeholder="Selecione uma opção"
            list
            androidList={formOfPayment}
            onValueChange={data => onPressDone('setFormPayment', data)}
            onPress={() => {
              setSelectPickerItens(formOfPayment);
              setSeterSelectPicker('setFormPayment');
              setvisible(true);
            }}
            value={formPayment}
          />
          {formPayment === 'Transferência' ? (
            <FildInputForm
              required={formPayment === 'Transferência'}
              lable="Conta"
              placeholder="Selecione uma opção"
              list
              androidList={Account}
              onValueChange={data => onPressDone('setAccount', data)}
              onPress={() => {
                setSelectPickerItens(Account);
                setSeterSelectPicker('setAccount');
                setvisible(true);
              }}
              value={account}
            />
          ) : null}
          <FildInputForm
            required
            lable="Data"
            keyboardType="numeric"
            maxLength={10}
            placeholder="Informe a data da transação"
            onChangeText={text => setDate(text)}
            value={Date.format(date)}
          />
          <FildInputForm
            required
            disabled
            lable="Valor"
            placeholder="Informe o Valor"
            // onChangeText={text => setValue(Money.format(text))}
            value={`R$ ${Money.format(dataPayment.balance)}`}
            // keyboardType="numeric"
          />
          <FildInputForm
            lable="Observações"
            placeholder="Informe mais detalhes "
            onChangeText={text => setNote(text)}
            value={note}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectPiker
        visible={visible}
        list={selectPickerItens}
        onPress={data => onPressDone(seterSelectPicker, data)}
      />
      <ModalSearch
        open={modalSearchShow}
        data={beneficiaries}
        onSelect={item => {
          setBeneficiary(item);
          setModalSearchShow(false);
        }}
        onClose={() => setModalSearchShow(false)}
      />
      <FullLoading loading={loading} />
      {visible ? (
        <SelectPiker
          list={selectPickerItens}
          onPress={data => onPressDone(seterSelectPicker, data)}
        />
      ) : null}
    </View>
  );
}
