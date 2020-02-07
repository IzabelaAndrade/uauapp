import React, { useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { useSelector } from 'react-redux';

import Date from '../../utils/Date';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import ModalSearch from '../../components/ModalSearch';
import FullLoading from '../../components/FullLoading';
import api from '../../services/api';

const formOfPayment = ['', 'Dinheiro', 'Transferência', 'Outros'];
const Account = ['', 'Caixa', 'Banco do Brasil'];

const discountType = [
  '',
  'Vale',
  'Vale Uniforme',
  'Vale Refeição',
  'Vale Transporte',
  'Vale Gasolina',
  'Vale Ferramenta',
  'Plano de Saúde',
  'INSS',
  'Falta',
];

export default function DiscountsForm({ navigation }) {
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
    async function getAllInterviewed() {
      let response = null;
      try {
        response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        console.log(error);
        return error;
      }
      return setBeneficiaries(response.data);
    }
    getAllInterviewed();
  }, [user]);

  async function save() {
    setLoading(true);
    try {
      await api.post(
        '/financerecord',
        {
          user: beneficiary.uuid,
          date,
          description: note,
          value,
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
        'Houve um erro ao tentar realizar o cadastro, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }
    Alert.alert(
      '',
      'Os dados foram alterados com sucesso.',
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        back
        iconRight="save"
        onPress={() => save()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <FildInputForm
            lable="Beneficiário"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setModalSearchShow(true);
            }}
            value={beneficiary.name}
          />
          <FildInputForm
            lable="Tipo do desconto"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setSelectPickerItens(discountType);
              setSeterSelectPicker('setType');
              setvisible(true);
            }}
            value={type}
          />
          <FildInputForm
            lable="Forma de pagamento"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setSelectPickerItens(formOfPayment);
              setSeterSelectPicker('setFormPayment');
              setvisible(true);
            }}
            value={formPayment}
          />
          {formPayment === 'Transferência' ? (
            <FildInputForm
              lable="Conta"
              placeholder="Selecione uma opção"
              list
              onPress={() => {
                setSelectPickerItens(Account);
                setSeterSelectPicker('setAccount');
                setvisible(true);
              }}
              value={account}
            />
          ) : null}
          <FildInputForm
            lable="Data"
            keyboardType="numeric"
            maxLength={10}
            placeholder="Informe a data da transação"
            onChangeText={text => setDate(text)}
            value={Date.format(date)}
          />
          <FildInputForm
            lable="Valor"
            placeholder="Informe o Valor"
            onChangeText={text => setValue(text)}
            value={value}
            keyboardType="number-pad"
          />
          <FildInputForm
            lable="Observações"
            placeholder="Informe mais detalhes "
            onChangeText={text => setNote(text)}
            value={note}
            multiline
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
          onPress={data => {
            if (seterSelectPicker === 'setFormPayment') {
              setFormPayment(data);
            } else if (seterSelectPicker === 'setType') {
              setType(data);
            } else if (seterSelectPicker === 'setAccount') {
              setAccount(data);
            } else if (seterSelectPicker === 'setBeneficiary') {
              setBeneficiary(data);
            }
            setvisible(false);
          }}
        />
      ) : null}
    </View>
  );
}
