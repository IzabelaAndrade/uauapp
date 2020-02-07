import React, { useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';

import HeaderForm from '../../components/HeaderForm';
import SelectPiker from '../../components/SelectPiker';
import BtnCancel from '../../components/BtnCancel';
import FullLoading from '../../components/FullLoading';
import ShowDataImage from '../../components/ShowDataImage';
import ShowFullImage from '../../components/ShowFullImage';

import {
  modifyShirt,
  modifyPants,
  modifyShoes,
  modifyPhoto,
  modifyDocFront,
  modifyDocBack,
  modifyImgVoterTitle,
  modifyImgAddress,
  modifyUuid,
  modifyImgCpf,
  clearRegister,
} from '../../store/modules/register/actions';

export default function EditDocumentsData({ navigation }) {
  const origin = navigation.state.params.origin
    ? navigation.state.params.origin
    : null;

  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const [visible, setvisible] = React.useState(false);
  const [button, setbutton] = React.useState('edit');
  const [imgVisible, setimgVisible] = React.useState(false);
  const [imageUrl, setimageUrl] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [list, setlist] = React.useState([]);
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

  useEffect(() => {
    if (origin === 'EditDocumentsData') {
      const { person } = navigation.state.params;
      console.log(person);
      dispatch(modifyUuid(person.uuid));
      if (person.Files && person.Files.length > 0) {
        const imgphoto = person.Files.find(element => element.type === 'photo');

        const docFront = person.Files.find(
          element => element.type === 'docFront'
        );
        const docBack = person.Files.find(
          element => element.type === 'docBack'
        );
        const vTitle = person.Files.find(
          element => element.type === 'voterTitle'
        );
        const address = person.Files.find(
          element => element.type === 'address'
        );
        const imgCpf = person.Files.find(
          element => element.type === 'validator'
        );

        setphoto(imgphoto ? imgphoto.url : null);
        setimageDocFront(docFront ? docFront.url : null);
        setimageDocBack(docBack ? docBack.url : null);
        setimageDocVoterTitle(vTitle ? vTitle.url : null);
        setimageDocAddress(address ? address.url : null);
        setimageCPF(imgCpf ? imgCpf.url : null);
        dispatch(modifyPhoto(imgphoto ? imgphoto.url : null));
        dispatch(modifyDocFront(docFront ? docFront.url : null));
        dispatch(modifyDocBack(docBack ? docBack.url : null));
        dispatch(modifyImgVoterTitle(vTitle ? vTitle.url : null));
        dispatch(modifyImgAddress(address ? address.url : null));
        dispatch(modifyImgCpf(imgCpf ? imgCpf.url : null));
      }
    }
  }, [dispatch, navigation.state.params, origin]);

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

  const sendImage = async (uri, type, uuid, requestType) => {
    const image = handleImage(uri);
    let response = null;
    if (requestType === 'post') {
      try {
        response = await api.post(`/files?user=${uuid}&type=${type}`, image, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'content-type': 'multipart/form-data',
          },
        });
      } catch (error) {
        setloading(false);
        console.log(error);
        throw error;
      }
    } else {
      try {
        response = await api.put(`/files?user=${uuid}&type=${type}`, image, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'content-type': 'multipart/form-data',
          },
        });
      } catch (error) {
        setloading(false);
        console.log(error);
        throw error;
      }
    }
    return response;
  };

  const onPressSave = async () => {
    if (button === 'edit') {
      setbutton('save');
      return;
    }
    setloading(true);
    let response = null;
    let requestType = null;

    if (
      register.photo === photo &&
      register.docFront === imageDocFront &&
      register.docBack === imageDocBack &&
      register.imgVoterTitle === imageDocVoterTitle &&
      register.imgAddress === imageDocAddress &&
      register.imgCpf === imageCPF
    ) {
      setloading(false);
      navigation.navigate('Home');
      dispatch(clearRegister());
      return;
    }

    if (register.photo !== photo) {
      console.log('photo');
      requestType = register.photo ? 'put' : 'post';
      response = await sendImage(photo, 'photo', register.uuid, requestType);
      dispatch(modifyPhoto(response.data.url));
    }
    if (register.docFront !== imageDocFront) {
      console.log('docFront');
      requestType = register.docFront ? 'put' : 'post';
      response = await sendImage(
        imageDocFront,
        'docFront',
        register.uuid,
        requestType
      );
      dispatch(modifyDocFront(response.data.url));
    }
    if (register.docBack !== imageDocBack) {
      console.log('docBack');
      requestType = register.docBack ? 'put' : 'post';
      response = await sendImage(
        imageDocBack,
        'docBack',
        register.uuid,
        requestType
      );

      dispatch(modifyDocBack(response.data.url));
    }
    if (register.imgVoterTitle !== imageDocVoterTitle) {
      console.log('imgVoterTitle');
      requestType = register.imgVoterTitle ? 'put' : 'post';
      response = await sendImage(
        imageDocVoterTitle,
        'voterTitle',
        register.uuid,
        requestType
      );

      dispatch(modifyImgVoterTitle(response.data.url));
    }
    if (register.imgAddress !== imageDocAddress) {
      console.log('imgAddress');
      requestType = register.imgAddress ? 'put' : 'post';
      response = await sendImage(
        imageDocAddress,
        'address',
        register.uuid,
        requestType
      );

      dispatch(modifyImgAddress(response.data.url));
    }
    if (register.imgCpf !== imageCPF) {
      requestType = register.imgCpf ? 'put' : 'post';
      response = await sendImage(
        imageCPF,
        'validator',
        register.uuid,
        requestType
      );

      dispatch(modifyImgCpf(response.data.url));
    }

    Alert.alert(
      '',
      'Os documentos foram alterados com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setloading(false);
            navigation.navigate('Home');
            dispatch(clearRegister());
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  function onPressSeeImage(type) {
    switch (type) {
      case 'photo':
        setimageUrl(photo);
        setimgVisible(true);
        break;
      case 'docFront':
        setimageUrl(imageDocFront);
        setimgVisible(true);
        break;
      case 'docBack':
        setimageUrl(imageDocBack);
        setimgVisible(true);
        break;
      case 'voterTitle':
        setimageUrl(imageDocVoterTitle);
        setimgVisible(true);
        break;
      case 'address':
        setimageUrl(imageDocAddress);
        setimgVisible(true);
        break;
      case 'docCPF':
        setimageUrl(imageCPF);
        setimgVisible(true);
        break;

      default:
        break;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight={button}
        onPress={onPressSave}
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
            disabled={!!(button === 'edit' && !photo)}
            onPress={() =>
              button === 'edit' ? onPressSeeImage('photo') : _pickImage('photo')
            }
            onPressDelete={() => setphoto(null)}
          />
          <ShowDataImage
            caption="Documento Identificador"
            lable="Frente"
            icon="docFront"
            url={imageDocFront}
            del={button === 'save' && !!imageDocFront}
            disabled={!!(button === 'edit' && !imageDocFront)}
            onPress={() =>
              button === 'edit'
                ? onPressSeeImage('docFront')
                : _pickImage('docFront')
            }
            onPressDelete={() => setimageDocFront(null)}
          />
          <ShowDataImage
            caption="Documento Identificador"
            lable="Verso"
            icon="docBack"
            url={imageDocBack}
            del={button === 'save' && !!imageDocBack}
            disabled={!!(button === 'edit' && !imageDocBack)}
            onPress={() =>
              button === 'edit'
                ? onPressSeeImage('docBack')
                : _pickImage('docBack')
            }
            onPressDelete={() => setimageDocBack(null)}
          />
          <ShowDataImage
            caption="Título de Eleitor"
            icon="voterTitle"
            url={imageDocVoterTitle}
            del={button === 'save' && !!imageDocVoterTitle}
            disabled={!!(button === 'edit' && !imageDocVoterTitle)}
            onPress={() =>
              button === 'edit'
                ? onPressSeeImage('voterTitle')
                : _pickImage('docVoterTitle')
            }
            onPressDelete={() => setimageDocVoterTitle(null)}
          />
          <ShowDataImage
            caption="Comprovante de Endereço"
            icon="address"
            url={imageDocAddress}
            del={button === 'save' && !!imageDocAddress}
            disabled={!!(button === 'edit' && !imageDocAddress)}
            onPress={() =>
              button === 'edit'
                ? onPressSeeImage('address')
                : _pickImage('docAddress')
            }
            onPressDelete={() => setimageDocAddress(null)}
          />
          {origin ? (
            <ShowDataImage
              caption="Validação de CPF"
              icon="docBack"
              url={imageCPF}
              del={button === 'save' && !!imageCPF}
              disabled={!!(button === 'edit' && !imageCPF)}
              onPress={() =>
                button === 'edit'
                  ? onPressSeeImage('docCPF')
                  : _pickImage('docCPF')
              }
              onPressDelete={() => setimageCPF(null)}
            />
          ) : null}
          <BtnCancel onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
      <FullLoading loading={loading} />
      <ShowFullImage
        onPress={() => setimgVisible(false)}
        imageUrl={imageUrl}
        imgVisible={imgVisible}
      />
    </View>
  );
}
