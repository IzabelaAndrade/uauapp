import React, { useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { useSelector } from 'react-redux';

import Date from '../../utils/Date';
import Money from '../../utils/Money';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import ModalSearch from '../../components/ModalSearch';
import SelectPiker from '../../components/SelectPiker';
import FullLoading from '../../components/FullLoading';
import api from '../../services/api';

const additionType = [
  '',
  'Salário',
  'Medição',
  'Reembolso',
  'Bônus',
  'Comissão',
];

export default function AdditionForm({ navigation }) {
  const [type, setType] = React.useState('');
  const [value, setValue] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectPickerItens, setSelectPickerItens] = React.useState([]);
  const [seterSelectPicker, setSeterSelectPicker] = React.useState(null);
  const [visible, setvisible] = React.useState(false);
  const [modalSearchShow, setModalSearchShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const user = useSelector(state => state.auth);
  const [beneficiaries, setBeneficiaries] = React.useState([]);
  const [beneficiary, setBeneficiary] = React.useState('');

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
    if (!beneficiary.uuid || !date || !type || !value) {
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
          user: beneficiary.uuid,
          date,
          description: note,
          value: Money.strip(value),
          type,
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
          {/* <FildInputForm
            lable="Beneficiário"
            placeholder="Selecione uma opção"
            list
            androidList={beneficiaries}
            onValueChange={data => onPressDone('setBeneficiary', data)}
            onPress={() => {
              setSelectPickerItens(beneficiaries);
              setSeterSelectPicker('setBeneficiary');
              setvisible(true);
            }}
            value={beneficiary}
          /> */}
          <FildInputForm
            required
            lable="Beneficiário"
            placeholder="Selecione uma opção"
            list
            androidList={beneficiaries}
            onValueChange={data => onPressDone('setBeneficiary', data)}
            onPress={() => {
              setModalSearchShow(true);
            }}
            value={beneficiary.name}
          />
          <FildInputForm
            required
            lable="Tipo do provento"
            placeholder="Selecione uma opção"
            list
            androidList={additionType}
            onValueChange={data => onPressDone('setType', data)}
            onPress={() => {
              setSelectPickerItens(additionType);
              setSeterSelectPicker('setType');
              setvisible(true);
            }}
            value={type}
          />
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
            lable="Valor"
            placeholder="Informe o Valor"
            onChangeText={text => setValue(Money.format(text))}
            value={value}
            keyboardType="numeric"
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
    </View>
  );
}
