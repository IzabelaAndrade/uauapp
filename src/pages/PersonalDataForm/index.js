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

const educationList = [
  'Selecione uma opção',
  'Não Possui',
  'Ensino Fundamental',
  'Ensino Médio',
  'Ensino Superior Incompleto',
  'Ensino Superior Completo',
];

const jobList = [
  'Administrativo',
  'Ajudante',
  'Almoxarifado',
  'Azulejista',
  'Coringa',
  'Cozinhiero(a)',
  'Eletricista',
  'Empreiteiro(a)',
  'Encanador(a)',
  'Encarregado(a) de Obra',
  'Engenheiro(a)',
  'Estagiario(a)',
  'Financeiro',
  'Gesseiro(a)',
  'Guarda',
  'Hidraulica',
  'Instalador(a) de PVC',
  'Marceneiro(a)',
  'Meio Oficial',
  'Montador(a)',
  'Motorista',
  'Moto Boy',
  'Pedreiro(a)',
  'Pintor(a)',
  'Refrigeração',
  'Segurança do Trabalho',
  'Serralheiro(a)',
  'Serviços Gerais',
  'Tec Manutenção',
  'Vidraceiro(a)',
];

const sizeList = [
  'Selecione uma opção',
  'Pequeno',
  'Médio',
  'Grande',
  'Extra Grande',
];

const shoesList = [
  'Selecione uma opção',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
];

export default function PersonalDataForm({ navigation }) {
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
      case 'shirt':
        // setshirt(value);
        dispatch(modifyShirt(value));
        break;

      case 'pants':
        dispatch(modifyPants(value));
        break;

      case 'shoes':
        dispatch(modifyShoes(value));
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
        screen="SocioeconomicForm"
        back
        iconRight="next"
        onPress={() => navigation.navigate('SocioeconomicForm')}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={
                register.photo
                  ? { uri: register.photo }
                  : require('../../assets/avatar.png')
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
            onPress={() => {
              setlist(educationList);
              setvisible(true);
              setpikerType('education');
            }}
            // onPress={() => setvisible(true)}
            value={register.education}
          />
          <FildInputForm
            lable="Habilidades"
            placeholder="Selecione uma ou mais opções"
            list
            onPress={() => setvisiblehability(true)}
            value={
              register.hability.length < 1 ? '' : register.hability.join(', ')
            }
          />
          <FildInputForm
            lable="Contato de Referencia"
            placeholder="Informe um contato"
            onChangeText={text => dispatch(modifyReference(text))}
            value={register.reference}
            // onChangeText={text => setreference(text)}
            // value={reference}
          />
          {/* {oldScreen ? (
            <>
              <FildInputForm
                lable="Tamanho Camisa"
                placeholder="Selecione uma opção"
                list
                onPress={() => {
                  setlist(sizeList);
                  setvisible(true);
                  setpikerType('shirt');
                }}
                value={register.shirt}
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
                value={register.pants}
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
                value={register.shoes}
              />
            </>
          ) : null} */}

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
        selectedList={register.hability}
        onPressConfirm={selectedList => {
          console.log(selectedList);
          dispatch(modifyHability(selectedList));
          // setdesiredVacancy(jobs);
          setvisiblehability(false);
        }}
      />
    </View>
  );
}
