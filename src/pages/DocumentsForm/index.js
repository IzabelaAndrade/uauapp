import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import FildImageForm from '../../components/FildImageForm';
import SelectPiker from '../../components/SelectPiker';

import {
  modifyShirt,
  modifyPants,
  modifyShoes,
  modifyDocFront,
  modifyDocBack,
  modifyImgVoterTitle,
  modifyImgAddress,
  clearRegister,
} from '../../store/modules/register/actions';

// import { Container } from './styles';
import { sizeList, shoesList } from '../../utils/List';

export default function DocumentsForm({ navigation }) {
  const [visible, setvisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState([]);
  const [saveImage, setsaveImage] = React.useState(false);
  const [imageDocFront, setimageDocFront] = React.useState(null);
  const [imageDocBack, setimageDocBack] = React.useState(null);
  const [imageDocAddress, setimageDocAddress] = React.useState(null);
  const [imageDocVoterTitle, setimageDocVoterTitle] = React.useState(null);

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const _pickImage = async image => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log('erro permissão negada!');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      switch (image) {
        case 'docFront':
          dispatch(modifyDocFront(result.uri));
          setimageDocFront(result.uri);
          setsaveImage(true);
          break;

        case 'docBack':
          dispatch(modifyDocBack(result.uri));
          setimageDocBack(result.uri);
          setsaveImage(true);
          break;

        case 'docVoterTitle':
          dispatch(modifyImgVoterTitle(result.uri));
          setimageDocVoterTitle(result.uri);
          setsaveImage(true);
          break;

        case 'docAddress':
          dispatch(modifyImgAddress(result.uri));
          setimageDocAddress(result.uri);
          setsaveImage(true);
          break;

        default:
          break;
      }
    }
  };

  const handleImage = uri => {
    const fileType = uri.substring(uri.lastIndexOf('.') + 1, uri.length);
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    return formData;
  };

  const sendImage = async (uri, type, uuid) => {
    const image = handleImage(uri);
    let response = null;
    try {
      response = await api.post(`/files?user=${uuid}&type=${type}`, image, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'content-type': 'multipart/form-data',
        },
      });
    } catch (error) {
      // console.log(error.response);
      throw error;
    }
    // console.log(response);
    return response;
  };

  const AlertConfirm = () => {
    return Alert.alert(
      '',
      'Registro realizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            setloading(false);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  async function makeRegister() {
    setloading(true);

    if (
      // !register.photo ||
      !register.name ||
      !register.cpf
      // !register.birthday ||
      // !register.phone ||
      // !register.education ||
      // !register.hability ||
      // !register.reference
    ) {
      return Alert.alert(
        'Ops!',
        'Existem itens obrigatórios que não foram informados',
        [
          {
            text: 'OK',
            onPress: () => {
              setloading(false);
            },
          },
        ],
        { cancelable: false }
      );
    }

    let response = null;
    try {
      response = await api.post('/person', register, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
    // console.log(response.data.person);
    const { uuid } = response.data.person;

    if (register.photo) await sendImage(register.photo, 'photo', uuid);
    if (register.docFront) await sendImage(register.docFront, 'docFront', uuid);
    if (register.docBack) await sendImage(register.docBack, 'docBack', uuid);
    if (register.imgVoterTitle)
      await sendImage(register.imgVoterTitle, 'voterTitle', uuid);
    if (register.imgAddress) sendImage(register.imgAddress, 'address', uuid);
    dispatch(clearRegister());
    AlertConfirm();
  }

  const onPressDone = (type, value) => {
    switch (type) {
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
        screen="ReferenceForm"
        back
        iconRight="save"
        onPress={() => makeRegister()}
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
            Documentos
          </Text>

          <FildImageForm
            lable="Documento Identificador"
            caption="Frente"
            icon="docFront"
            value={imageDocFront}
            onPress={() => {
              _pickImage('docFront');
            }}
          />
          <FildImageForm
            lable="Documento Identificador"
            caption="Verso"
            icon="docBack"
            value={imageDocBack}
            onPress={() => {
              _pickImage('docBack');
            }}
          />
          <FildImageForm
            lable="Título de Eleitor"
            icon="voterTitle"
            value={imageDocVoterTitle}
            onPress={() => {
              _pickImage('docVoterTitle');
            }}
          />
          <FildImageForm
            lable="Comprovante de Endereço"
            icon="address"
            value={imageDocAddress}
            onPress={() => {
              _pickImage('docAddress');
            }}
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
            value={register.shirt}
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
            value={register.pants}
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
            value={register.shoes}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => onPressDone(pikerType, value)}
      />
      <Modal
        animationType="fade"
        transparent
        visible={loading}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            marginTop: 22,
            backgroundColor: 'rgba(255,255,255,.6)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 8,
            }}
          >
            <ActivityIndicator size="large" color="#f48024" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
