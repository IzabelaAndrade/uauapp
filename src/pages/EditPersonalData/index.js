import React from 'react';
import {
  View,
  Alert,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
import FullLoading from '../../components/FullLoading';

import { educationList, jobList, sizeList, shoesList } from '../../utils/List';

import api from '../../services/api';

export default function EditPersonalData({ navigation }) {
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  // console.log(register);
  const [saveImage, setsaveImage] = React.useState(false);
  const [visible, setvisible] = React.useState(false);
  const [visiblehability, setvisiblehability] = React.useState(false);
  const [list, setlist] = React.useState('');
  const [pikerType, setpikerType] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  const [name, setname] = React.useState(register.name);
  const [rg, setrg] = React.useState(register.rg);
  const [cpf, setcpf] = React.useState(register.cpf);
  const [voterTitle, setvoterTitle] = React.useState(register.voterTitle);
  const [email, setemail] = React.useState(register.email);
  const [birthday, setbirthday] = React.useState(
    moment(register.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
  );
  const [phone, setphone] = React.useState(register.phone);
  const [education, seteducation] = React.useState(register.education);
  const [hability, sethability] = React.useState(register.hability);
  const [reference, setreference] = React.useState(register.reference);
  const [shirt, setshirt] = React.useState(register.shirt);
  const [pants, setpants] = React.useState(register.pants);
  const [shoes, setshoes] = React.useState(register.shoes);

  const dispatch = useDispatch();

  const onPressSave = async () => {
    setloading(true);
    let response = null;
    try {
      response = await api.put(
        '/person',
        {
          uuid: register.uuid,
          name,
          rg,
          cpf,
          voterTitle,
          email,
          birthday,
          phone,
          education,
          hability,
          reference,
          shirt,
          shoes,
          pants,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar realizar o cadastro, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }
    dispatch(modifyName(response.data.person.name));
    dispatch(modifyRG(response.data.person.rg));
    dispatch(modifyCPF(response.data.person.cpf));
    dispatch(modifyVoterTitle(response.data.person.voter_title));
    dispatch(
      modifyBirthday(
        moment(response.data.person.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
      )
    );
    dispatch(modifyEmail(response.data.person.email));
    dispatch(modifyPhone(response.data.person.phone));
    dispatch(modifyReference(response.data.person.reference));
    dispatch(modifyEducation(response.data.person.education));
    dispatch(modifyShirt(response.data.person.shirt_size));
    dispatch(modifyPants(response.data.person.pants_size));
    dispatch(modifyShoes(response.data.person.boot_size));
    dispatch(modifyHability(response.data.person.hability));

    Alert.alert(
      '',
      'Os dados foram alterados com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setloading(false);
            navigation.goBack();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
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
      <HeaderForm
        navigation={navigation}
        back
        iconRight="save"
        onPress={onPressSave}
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
            androidList={educationList}
            onValueChange={value => onPressDone('education', value)}
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
            multiselector
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
            androidList={sizeList}
            onValueChange={value => onPressDone('shirt', value)}
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
            androidList={sizeList}
            onValueChange={value => onPressDone('pants', value)}
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
            androidList={shoesList}
            onValueChange={value => onPressDone('shoes', value)}
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

      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => onPressDone(pikerType, value)}
      />
      <MultiSelectPiker
        show={visiblehability}
        dataList={jobList}
        selectedList={hability}
        onPressConfirm={selectedList => {
          sethability(selectedList);
          setvisiblehability(false);
        }}
      />
      <FullLoading loading={loading} />
    </View>
  );
}
