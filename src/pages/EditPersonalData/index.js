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
  modifyVoterTitle,
  modifyEmail,
  modifyBirthday,
  modifyPhone,
  modifyEducation,
  modifyHability,
  modifyReference,
  modifyPhoto,
  modifyShirt,
  modifyPants,
  modifyShoes,
} from '../../store/modules/register/actions';

import Date from '../../utils/Date';
import Phone from '../../utils/Phone';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import MultiSelectPiker from '../../components/MultiSelectPiker';
import BtnCancel from '../../components/BtnCancel';

import { educationList, jobList, sizeList, shoesList } from '../../utils/List';

export default function EditPersonalData({ navigation }) {
  const register = useSelector(state => state.register);

  // console.log(navigation.state.params.screen);
  const oldScreen = navigation.state.params
    ? navigation.state.params.screen
    : null;
  const [image, setimage] = React.useState(null);
  const [saveImage, setsaveImage] = React.useState(false);
  const [visible, setvisible] = React.useState(false);
  const [visiblehability, setvisiblehability] = React.useState(false);
  const [list, setlist] = React.useState('');
  const [pikerType, setpikerType] = React.useState([]);

  const [name, setname] = React.useState(register.name);
  const [rg, setrg] = React.useState(register.rg);
  const [cpf, setcpf] = React.useState(register.cpf);
  const [voterTitle, setvoterTitle] = React.useState(register.voterTitle);
  const [email, setemail] = React.useState(register.email);
  const [birthday, setbirthday] = React.useState(register.birthday);
  const [phone, setphone] = React.useState(register.phone);
  const [education, seteducation] = React.useState(register.education);
  const [hability, sethability] = React.useState(register.hability);
  const [reference, setreference] = React.useState(register.reference);
  const [shirt, setshirt] = React.useState(register.shirt);
  const [pants, setpants] = React.useState(register.pants);
  const [shoes, setshoes] = React.useState(register.shoes);

  const dispatch = useDispatch();

  const onPressSave = () => {
    dispatch(modifyName(text));
    dispatch(modifyRG(text));
    dispatch(modifyCPF(text));
    dispatch(modifyVoterTitle(text));
    dispatch(modifyBirthday(text));
    dispatch(modifyEmail(text));
    dispatch(modifyPhone(text));
    dispatch(modifyReference(text));
    dispatch(modifyEducation(value));
    dispatch(modifyShirt(value));
    dispatch(modifyPants(value));
    dispatch(modifyShoes(value));
    dispatch(modifyHability(selectedList));
  };

  const onPressDone = (type, value) => {
    switch (type) {
      case 'education':
        seteducation(value);
        break;
      case 'shirt':
        setshirt(value);
        break;

      case 'pants':
        setpants(value);
        break;

      case 'shoes':
        setshoes(value);
        break;

      default:
        break;
    }
    setvisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm navigation={navigation} back iconRight="save" />
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
            Dados Pessoais
          </Text>
          <FildInputForm
            lable="Nome Completo"
            placeholder="Informe o nome"
            onChangeText={text => setname(text)}
            value={name}
          />
          <FildInputForm
            lable="RG"
            placeholder="Informe o nº da identidade"
            onChangeText={text => setrg(text)}
            value={rg}
          />
          <FildInputForm
            lable="CPF"
            placeholder="Informe o nº do CPF"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={text => setcpf(text)}
            value={Cpf.format(cpf)}
          />
          <FildInputForm
            lable="Título de Eleitor"
            placeholder="Informe o nº do titulo"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={text => setvoterTitle(text)}
            value={voterTitle}
          />

          <FildInputForm
            lable="E-mail"
            placeholder="Informe o email"
            keyboardType="email-address"
            onChangeText={text => setemail(text)}
            value={email}
          />
          <FildInputForm
            lable="Data de Nascimento"
            keyboardType="numeric"
            maxLength={10}
            placeholder="Informe a data de nascimento"
            onChangeText={text => setbirthday(text)}
            value={Date.format(birthday)}
          />
          <FildInputForm
            lable="Telefone"
            placeholder="Informe o nº de telefone"
            keyboardType="numeric"
            maxLength={15}
            onChangeText={text => setphone(text)}
            value={Phone.format(phone)}
          />
          <FildInputForm
            lable="Escolaridade"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(educationList);
              setvisible(true);
              setpikerType('education');
            }}
            value={education}
          />
          <FildInputForm
            lable="Habilidades"
            placeholder="Selecione uma ou mais opções"
            list
            onPress={() => setvisiblehability(true)}
            value={hability.length < 1 ? '' : hability.join(', ')}
          />
          <FildInputForm
            lable="Contato de Referencia"
            placeholder="Informe um contato"
            onChangeText={text => setreference(text)}
            value={reference}
          />
          <FildInputForm
            lable="Tamanho Camisa"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(sizeList);
              setvisible(true);
              setpikerType('shirt');
            }}
            value={shirt}
          />
          <FildInputForm
            lable="Tamanho Calça"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(sizeList);
              setvisible(true);
              setpikerType('pants');
            }}
            value={pants}
          />
          <FildInputForm
            lable="Tamanho Sapato"
            placeholder="Selecione uma opção"
            list
            onPress={() => {
              setlist(shoesList);
              setvisible(true);
              setpikerType('shoes');
            }}
            value={shoes}
          />
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>

      {visible ? (
        <SelectPiker
          list={list}
          // onPress={value => {
          //   dispatch(modifyEducation(value));
          //   // seteducation(value);
          //   setvisible(false);
          // }}
          onPress={value => onPressDone(pikerType, value)}
        />
      ) : null}
      <MultiSelectPiker
        show={visiblehability}
        dataList={jobList}
        selectedList={hability}
        onPressConfirm={selectedList => {
          sethability(selectedList);
          setvisiblehability(false);
        }}
      />
    </View>
  );
}
