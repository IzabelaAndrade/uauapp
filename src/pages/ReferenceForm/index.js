import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {
  modifyLastJob,
  modifyTimeJob,
  modifyTypeJob,
  modifyDescriptionJob,
} from '../../store/modules/register/actions';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';

const typeJobList = ['Selecione uma opção', 'Contrato', 'CLT', 'Outros'];

export default function ReferenceForm({ navigation }) {
  const [lastJob, setlastJob] = React.useState('');
  const [timeJob, settimeJob] = React.useState('');
  const [typeJob, settypeJob] = React.useState('');
  const [descriptionJob, setdescriptionJob] = React.useState('');
  const [visible, setvisible] = React.useState('');

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="Main"
        back
        save
        onPress={() => console.log(register)}
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
            Experiência Profissional
          </Text>
          <FildInputForm
            lable="Último emprego"
            placeholder="Informe o nome da empresa"
            onChangeText={text => dispatch(modifyLastJob(text))}
            value={register.lastJob}
          />
          <FildInputForm
            lable="Quanto tempo"
            placeholder="Informe o periodo de tempo"
            onChangeText={text => dispatch(modifyTimeJob(text))}
            value={register.timeJob}
          />
          <FildInputForm
            lable="Função que atuava"
            placeholder="Descrição da função"
            onChangeText={text => dispatch(modifyDescriptionJob(text))}
            value={register.descriptionJob}
          />
          <FildInputForm
            lable="Forma de Trabalho"
            placeholder="Selecione uma opção"
            list
            onPress={() => setvisible(true)}
            value={register.typeJob}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {visible ? (
        <SelectPiker
          list={typeJobList}
          onPress={value => {
            dispatch(modifyTypeJob(value));
            setvisible(false);
          }}
        />
      ) : null}
    </View>
  );
}
