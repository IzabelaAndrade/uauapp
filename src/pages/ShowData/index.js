import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import Constants from 'expo-constants';

import moment from 'moment';
import HeaderForm from '../../components/HeaderForm';

import Cpf from '../../utils/Cpf';

const { width, height } = Dimensions.get('window');

// import { Container } from './styles';

function ShowDataItem({ lable, value }) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
      }}
    >
      <Text style={{ fontWeight: '500', fontSize: 14 }}>{lable}</Text>

      <Text
        style={{
          fontSize: 21,
          fontWeight: '300',
          flex: 1,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
function ShowDataImage({ item, onPress }) {
  let lable = '';
  let title = '';
  switch (item.type) {
    case 'photo':
      lable = 'Imagem';
      title = 'Foto ';
      break;

    case 'docFront':
      lable = 'Frente';
      title = 'Documento de Identificação';
      break;

    case 'docBack':
      lable = 'Verso';
      title = 'Documento de Identificação';
      break;

    case 'voterTitle':
      lable = 'Imagem';
      title = 'Título de Eleitor';
      break;

    case 'address':
      lable = 'Imagem';
      title = 'Comprovante de Endereço';
      break;

    default:
      break;
  }
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        flexDirection: 'row',
      }}
      onPress={() => onPress(item.url)}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '500', fontSize: 14 }}>{lable}</Text>

        <Text
          style={{
            fontSize: 21,
            fontWeight: '300',
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <Image
        style={{ width: 55, height: 55 }}
        source={{ uri: item.url }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

function RenderDatas({ screeninfo, data }) {
  switch (screeninfo) {
    case 'PersonalData':
      return (
        <>
          <ShowDataItem lable="Nome Completo" value={data.name} />
          <ShowDataItem lable="RG" value={data.rg} />
          <ShowDataItem lable="CPF" value={Cpf.format(data.cpf)} />
          <ShowDataItem
            lable="Data de Nascimento"
            value={moment(data.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          />
          <ShowDataItem lable="Telefone" value={data.phone} />
          <ShowDataItem lable="Escolaridade" value={data.education} />
          <ShowDataItem
            lable="Habilidades"
            value={data.hability.length < 1 ? '' : data.hability.join(', ')}
          />
          <ShowDataItem lable="Contato de Referência" value={data.reference} />
        </>
      );

    case 'Socioeconomic':
      return (
        <>
          <ShowDataItem lable="Estado Civil" value={data.marital_status} />
          <ShowDataItem lable="Número de Dependentes" value={data.dependents} />
          <ShowDataItem lable="Tipo de Moradia" value={data.home} />
          <ShowDataItem lable="Bairro" value={data.neighborhood} />
          <ShowDataItem lable="Logradouro" value={data.address} />
          <ShowDataItem lable="Meio de Transporte" value={data.transport} />
          <ShowDataItem lable="Habilitação" value={data.habilitation} />
        </>
      );

    case 'Reference':
      return (
        <>
          <ShowDataItem lable="Último Emprego" value={data.lastJob} />
          <ShowDataItem lable="Tempo de Permanência" value={data.timeJob} />
          <ShowDataItem lable="Função que Atuava" value={data.descriptionJob} />
          <ShowDataItem lable="Regime de Trabalho" value={data.typeJob} />
        </>
      );

    case 'FinancesData':
      return (
        <>
          <ShowDataItem lable="Banco" value={data.bank} />
          <ShowDataItem lable="Tipo de Conta" value={data.type} />
          <ShowDataItem lable="Agência" value={data.agency} />
          <ShowDataItem lable="Operação" value={data.operation} />
          <ShowDataItem lable="Nº da Conta" value={data.account} />
          <ShowDataItem lable="Nome do Titular" value={data.name} />
          <ShowDataItem lable="CPF do Titular" value={data.cpf} />
        </>
      );

    default:
      break;
  }
}

export default function ShowData(props) {
  const screeninfo = props.navigation.state.params.screen;
  const { data } = props.navigation.state.params;
  const [docs, setdocs] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [imageUrl, setimageUrl] = React.useState('');

  useEffect(() => {
    const images = data;
    setdocs(images);
  }, [data]);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={props.navigation}
        screen="SocioeconomicForm"
        back
      />
      {screeninfo === 'Docs' ? (
        <FlatList
          data={docs}
          renderItem={({ item }) => (
            <ShowDataImage
              item={item}
              onPress={docUrl => {
                console.log(docUrl);
                setimageUrl(docUrl);
                setModalVisible(true);
              }}
            />
          )}
          keyExtractor={item => item.url}
        />
      ) : (
        <ScrollView>
          <RenderDatas screeninfo={screeninfo} data={data} />
        </ScrollView>
      )}

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              marginTop: Constants.statusBarHeight,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Feather name="chevron-left" size={28} color="#f48024" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: width - 40, height: height - 200 }}
              source={{ uri: imageUrl }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
