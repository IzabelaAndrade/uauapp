import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

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
} from '../../store/modules/register/actions';

import Date from '../../utils/Date';
import Phone from '../../utils/Phone';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import MultiSelectPiker from '../../components/MultiSelectPiker';
import BtnBottomNext from '../../components/BtnBottomNext';

import { educationList, jobList } from '../../utils/List';

const stylesPDForm = StyleSheet.create({
  cotainer: { flex: 1, backgroundColor: '#fff' },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  avatarBtn: {
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: -26,
    zIndex: 1,
    marginRight: -80,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default function PersonalDataForm({ navigation }) {
  const [image, setimage] = React.useState(null);
  const [saveImage, setsaveImage] = React.useState(false);
  const [visible, setvisible] = React.useState(false);
  const [visiblehability, setvisiblehability] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState([]);

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('erro permissão negada!');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result.uri);
      dispatch(modifyPhoto(result.uri));
      setimage(result.uri);
      setsaveImage(true);
    }
  };

  const onPressDone = (type, value) => {
    switch (type) {
      case 'education':
        dispatch(modifyEducation(value));
        break;

      default:
        break;
    }
    setvisible(false);
  };

  return (
    <View style={stylesPDForm.cotainer}>
      <HeaderForm
        navigation={navigation}
        screen="SocioeconomicForm"
        back
        iconRight="next"
        onPress={() => navigation.navigate('SocioeconomicForm')}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <Image
            style={stylesPDForm.avatarImg}
            source={
              register.photo
                ? { uri: register.photo }
                : require('../../assets/avatar.png')
            }
          />
          <TouchableOpacity
            style={stylesPDForm.avatarBtn}
            onPress={() => {
              _pickImage();
            }}
          >
            <Feather name="plus" size={20} color="#f48024" />
          </TouchableOpacity>
          <Text style={stylesPDForm.title}>Dados Pessoais</Text>
          <FildInputForm
            required
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
            required
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
            lable="Título de Eleitor"
            placeholder="Informe o nº do titulo"
            keyboardType="numeric"
            maxLength={14}
            // onChangeText={text => setcpf(text)}
            // value={Cpf.format(cpf)}
            onChangeText={text => dispatch(modifyVoterTitle(text))}
            value={register.voterTitle}
          />

          <FildInputForm
            lable="E-mail"
            placeholder="Informe o email"
            keyboardType="email-address"
            // onChangeText={text => setcpf(text)}
            // value={Cpf.format(cpf)}
            onChangeText={text => dispatch(modifyEmail(text))}
            value={register.email}
          />
          <FildInputForm
            required
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
            required
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
            required
            lable="Escolaridade"
            placeholder="Selecione uma opção"
            list
            androidList={educationList}
            onValueChange={value => onPressDone('education', value)}
            onPress={() => {
              setlist(educationList);
              setvisible(true);
              setpikerType('education');
            }}
            // onValueChange={}
            // onPress={() => setvisible(true)}
            value={register.education}
          />
          <FildInputForm
            required
            lable="Habilidades"
            placeholder="Selecione uma ou mais opções"
            list
            multiselector
            onPress={() => setvisiblehability(true)}
            value={
              register.hability.length < 1 ? '' : register.hability.join(', ')
            }
          />
          <FildInputForm
            required
            lable="Contato de Referencia"
            placeholder="Informe um contato"
            onChangeText={text => dispatch(modifyReference(text))}
            value={register.reference}
            // onChangeText={text => setreference(text)}
            // value={reference}
          />

          <BtnBottomNext
            onPress={() => navigation.navigate('SocioeconomicForm')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => onPressDone(pikerType, value)}
      />
      <MultiSelectPiker
        show={visiblehability}
        dataList={jobList}
        selectedList={register.hability}
        onPressConfirm={selectedList => {
          dispatch(modifyHability(selectedList));
          setvisiblehability(false);
        }}
      />
    </View>
  );
}
