import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';
import { Feather, Ionicons } from '@expo/vector-icons';

import {
  modifyName,
  modifyRG,
  modifyCPF,
  modifyBirthday,
  modifyPhone,
  modifyEducation,
  modifyDesiredVacancy,
  modifyReference,
} from '../../store/modules/register/actions';

import Date from '../../utils/Date';
import Phone from '../../utils/Phone';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import MultiSelectPiker from '../../components/MultiSelectPiker';

const educationList = [
  'Selecione uma opção',
  'Não Possui',
  'Ensino Fundamental',
  'Ensino Médio',
  'Ensino Superior Incompleto',
  'Ensino Superior Completo',
];

const jobList = [
  { title: 'Alvenaria', check: false },
  { title: 'Pintura', check: false },
  { title: 'Elétrica', check: false },
  { title: 'Pedreiro', check: false },
];

export default function PersonalDataForm({ navigation }) {
  const [image, setimage] = React.useState(null);
  const [saveImage, setsaveImage] = React.useState(false);
  const [name, setname] = React.useState('');
  const [rg, setrg] = React.useState('');
  const [cpf, setcpf] = React.useState('');
  const [birthday, setbirthday] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [desiredVacancy, setdesiredVacancy] = React.useState('');
  const [education, seteducation] = React.useState('');
  const [reference, setreference] = React.useState('');
  const [visible, setvisible] = React.useState(false);
  const [visibledesiredVacancy, setvisibledesiredVacancy] = React.useState(
    false
  );

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('erro permissão negada!');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setimage(result.uri);
      setsaveImage(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="SocioeconomicForm"
        back
        onPress={() => navigation.navigate('SocioeconomicForm')}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={
                image ? { uri: image } : require('../../assets/avatar.png')
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 26,
                height: 26,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 14,
                marginTop: -26,
                zIndex: 1,
                marginRight: -80,
              }}
              onPress={() => {
                _pickImage();
              }}
            >
              <Feather name="plus" size={20} color="#f48024" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 25,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          >
            Dados Pessoais
          </Text>
          <FildInputForm
            lable="Nome Completo"
            placeholder="Informe o nome"
            onChangeText={text => dispatch(modifyName(text))}
            value={register.name}
            // onEndEditing={() => dispatch(modifyName(name))}
          />
          <FildInputForm
            lable="RG"
            placeholder="Informe o nº da identidade"
            // onChangeText={text => setrg(text)}
            // value={rg}
            onChangeText={text => dispatch(modifyRG(text))}
            value={register.rg}
          />
          <FildInputForm
            lable="CPF"
            placeholder="Informe o nº do CPF"
            keyboardType="numeric"
            maxLength={14}
            // onChangeText={text => setcpf(text)}
            // value={Cpf.format(cpf)}
            onChangeText={text => dispatch(modifyCPF(text))}
            value={Cpf.format(register.cpf)}
          />
          <FildInputForm
            lable="Data de Nascimento"
            keyboardType="numeric"
            maxLength={10}
            placeholder="Informe a data de nascimento"
            onChangeText={text => dispatch(modifyBirthday(text))}
            value={Date.format(register.birthday)}
            // onChangeText={text => setbirthday(text)}
            // value={Date.format(birthday)}
          />
          <FildInputForm
            lable="Telefone"
            placeholder="Informe o nº de telefone"
            keyboardType="numeric"
            maxLength={15}
            onChangeText={text => dispatch(modifyPhone(text))}
            value={Phone.format(register.phone)}
            // onChangeText={text => setphone(text)}
            // value={Phone.format(phone)}
          />
          <FildInputForm
            lable="Escolaridade"
            placeholder="Selecione uma opção"
            list
            onPress={() => setvisible(true)}
            value={register.education}
          />
          <FildInputForm
            lable="Vaga Pretendida"
            placeholder="Selecione uma opção"
            list
            onPress={() => setvisibledesiredVacancy(true)}
            value={register.desiredVacancy}
          />
          <FildInputForm
            lable="Contato de Referencia"
            placeholder="Informe um contato"
            onChangeText={text => dispatch(modifyReference(text))}
            value={register.reference}
            // onChangeText={text => setreference(text)}
            // value={reference}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: 20,
              height: 50,
              width: 80,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('SocioeconomicForm')}
          >
            <Ionicons
              name="ios-arrow-round-forward"
              size={40}
              color="#f48024"
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {visible ? (
        <SelectPiker
          list={educationList}
          onPress={value => {
            dispatch(modifyEducation(value));
            // seteducation(value);
            setvisible(false);
          }}
        />
      ) : null}
      <MultiSelectPiker
        show={visibledesiredVacancy}
        list={jobList}
        onPressClose={jobs => {
          dispatch(modifyDesiredVacancy(jobs));
          // setdesiredVacancy(jobs);
          setvisibledesiredVacancy(false);
        }}
      />
    </View>
  );
}
