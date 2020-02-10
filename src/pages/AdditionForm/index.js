import React, { useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { useSelector } from 'react-redux';

import Date from '../../utils/Date';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import api from '../../services/api';

const additionType = ['', 'Medição', 'Reembolso', 'Bonus', 'Comissão'];

export default function AdditionForm({ navigation }) {
  const [type, setType] = React.useState('');
  const [value, setValue] = React.useState('');
  const [note, setNote] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectPickerItens, setSelectPickerItens] = React.useState([]);
  const [seterSelectPicker, setSeterSelectPicker] = React.useState(null);
  const [visible, setvisible] = React.useState(false);

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
      const names = response.data.map(element => element.name);
      names.push('');
      setBeneficiaries(names);
    }
    getAllInterviewed();
  }, [user]);

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
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <FildInputForm
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
          />
          <FildInputForm
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

      <SelectPiker
        visible={visible}
        list={selectPickerItens}
        onPress={data => onPressDone(seterSelectPicker, data)}
      />
    </View>
  );
}
