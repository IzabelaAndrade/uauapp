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
import BtnCancel from '../../components/BtnCancel';
import ShowDataImage from '../../components/ShowDataImage';

import {
  modifyShirt,
  modifyPants,
  modifyShoes,
  modifyDocFront,
  modifyDocBack,
  modifyImgVoterTitle,
  modifyImgAddress,
} from '../../store/modules/register/actions';

export default function EditDocumentsData({ navigation }) {
  const origin = navigation.state.params.origin
    ? navigation.state.params.origin
    : null;

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const [visible, setvisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [list, setlist] = React.useState('');
  const [pikerType, setpikerType] = React.useState([]);
  const [saveImage, setsaveImage] = React.useState(false);
  const [photo, setphoto] = React.useState(register.photo);
  const [imageDocFront, setimageDocFront] = React.useState(register.docFront);
  const [imageDocBack, setimageDocBack] = React.useState(register.docBack);
  const [imageDocAddress, setimageDocAddress] = React.useState(
    register.imgAddress
  );
  const [imageDocVoterTitle, setimageDocVoterTitle] = React.useState(
    register.imgVoterTitle
  );
  const [imageCPF, setimageCPF] = React.useState(null);

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
        case 'photo':
          setphoto(result.uri);
          setsaveImage(true);
          break;

        case 'docFront':
          setimageDocFront(result.uri);
          setsaveImage(true);
          break;

        case 'docBack':
          setimageDocBack(result.uri);
          setsaveImage(true);
          break;

        case 'docVoterTitle':
          setimageDocVoterTitle(result.uri);
          setsaveImage(true);
          break;

        case 'docAddress':
          setimageDocAddress(result.uri);
          setsaveImage(true);
          break;

        case 'docCPF':
          setimageCPF(result.uri);
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
    const { uuid } = response.data.person;

    if (register.photo) await sendImage(register.photo, 'photo', uuid);
    if (register.docFront) await sendImage(register.docFront, 'docFront', uuid);
    if (register.docBack) await sendImage(register.docBack, 'docBack', uuid);
    if (register.imgVoterTitle)
      await sendImage(register.imgVoterTitle, 'voterTitle', uuid);
    if (register.imgAddress) sendImage(register.imgAddress, 'address', uuid);

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

  function onPressSave() {
    dispatch(modifyDocFront(result.uri));
    dispatch(modifyDocFront(result.uri));
    dispatch(modifyDocBack(result.uri));
    dispatch(modifyImgVoterTitle(result.uri));
    dispatch(modifyImgAddress(result.uri));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight="save"
        // onPress={() => makeRegister()}
        // onPress={() => navigation.navigate('ReferenceForm')}
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

          <ShowDataImage
            lable="Imagem"
            caption="Foto"
            icon="photo"
            url={photo}
            onPress={() => {
              _pickImage('photo');
            }}
            del={!!photo}
            onPressDelete={() => setphoto(null)}
          />
          <ShowDataImage
            caption="Documento Identificador"
            lable="Frente"
            icon="docFront"
            url={imageDocFront}
            del={!!imageDocFront}
            onPress={() => {
              _pickImage('docFront');
            }}
            onPressDelete={() => setimageDocFront(null)}
          />
          <ShowDataImage
            caption="Documento Identificador"
            lable="Verso"
            icon="docBack"
            url={imageDocBack}
            del={!!imageDocBack}
            onPress={() => {
              _pickImage('docBack');
            }}
            onPressDelete={() => setimageDocBack(null)}
          />
          <ShowDataImage
            caption="Título de Eleitor"
            icon="voterTitle"
            url={imageDocVoterTitle}
            del={!!imageDocVoterTitle}
            onPress={() => {
              _pickImage('docVoterTitle');
            }}
            onPressDelete={() => setimageDocVoterTitle(null)}
          />
          <ShowDataImage
            caption="Comprovante de Endereço"
            icon="address"
            url={imageDocAddress}
            del={!!imageDocAddress}
            onPress={() => {
              _pickImage('docAddress');
            }}
            onPressDelete={() => setimageDocAddress(null)}
          />
          {origin ? (
            <ShowDataImage
              caption="Validação de CPF"
              icon="docBack"
              url={imageCPF}
              del={!!imageCPF}
              onPress={() => {
                _pickImage('docCPF');
              }}
              onPressDelete={() => setimageCPF(null)}
            />
          ) : null}
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
      {visible ? (
        <SelectPiker
          list={list}
          onPress={value => onPressDone(pikerType, value)}
        />
      ) : null}
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
