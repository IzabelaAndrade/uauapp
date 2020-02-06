import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { Feather, Ionicons } from '@expo/vector-icons';

import { modifyEducation } from '../../store/modules/register/actions';

import Date from '../../utils/Date';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import ModalSearch from '../../components/ModalSearch';
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

  const user = useSelector(state => state.auth);
  const [beneficiaries, setBeneficiaries] = React.useState([]);
  const [beneficiary, setBeneficiary] = React.useState('');
  const [modalSearchShow, setModalSearchShow] = React.useState(false);

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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm navigation={navigation} back />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <FildInputForm
            lable="Beneficiário"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setModalSearchShow(true);
            }}
            value={beneficiary}
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
        onSelect={item => setBeneficiaries(item)}
      />
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
