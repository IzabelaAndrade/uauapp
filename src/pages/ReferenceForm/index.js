import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
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

import { typeJobList } from '../../utils/List';

export default function ReferenceForm({ navigation }) {
  const [visible, setvisible] = React.useState('');

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="Main"
        back
        iconRight="next"
        onPress={() => navigation.navigate('FinancesDataForm')}
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
            Experiência Profissional
          </Text>
          <FildInputForm
            lable="Último emprego"
            placeholder="Informe o nome da empresa"
            onChangeText={text => dispatch(modifyLastJob(text))}
            value={register.lastJob}
          />
          <FildInputForm
            lable="Tempo de Permanência"
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
            lable="Regime de Trabalho"
            placeholder="Selecione uma opção"
            list
            androidList={typeJobList}
            onValueChange={value => {
              dispatch(modifyTypeJob(value));
            }}
            onPress={() => setvisible(true)}
            value={register.typeJob}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: 20,
          height: 50,
          width: 80,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('FinancesDataForm')}
      >
        <Ionicons name="ios-arrow-round-forward" size={40} color="#f48024" />
      </TouchableOpacity>
      <SelectPiker
        visible={visible}
        list={typeJobList}
        onPress={value => {
          dispatch(modifyTypeJob(value));
          setvisible(false);
        }}
      />
    </View>
  );
}
