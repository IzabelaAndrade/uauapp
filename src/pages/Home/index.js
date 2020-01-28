import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from '@expo/vector-icons';

// import { Container } from './styles';

function BtnMenu({ lable, onPress, icon }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#bcbcbc',
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        {RenderIcon(icon)}
        <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: '400' }}>
          {lable}
        </Text>
      </View>
      <Feather name="chevron-right" size={25} color="#f48024" />
    </TouchableOpacity>
  );
}

function RenderIcon(icon) {
  switch (icon) {
    case 'new':
      return <AntDesign name="adduser" size={25} color="#bcbcbc" />;

    case 'search':
      return <AntDesign name="search1" size={25} color="#bcbcbc" />;

    case 'complete':
      return <AntDesign name="edit" size={25} color="#bcbcbc" />;

    case 'addfile':
      return <AntDesign name="paperclip" size={25} color="#bcbcbc" />;

    case 'check':
      return <AntDesign name="check" size={25} color="#bcbcbc" />;

    case 'addperson':
      return <MaterialIcons name="assignment-ind" size={25} color="#bcbcbc" />;

    default:
      return <Feather name="chevron-right" size={25} color="#f48024" />;
  }
}

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="default" backgroundColor="#f48024" />
      <View
        style={{
          marginTop: Constants.statusBarHeight,
          height: 110,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
          shadowColor: '#e1e1e1e1',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          marginBottom: 10,
          backgroundColor: '#fff',
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: '600', color: '#f48024' }}>
          Avanci
        </Text>
        <Image
          style={{ width: 32, height: 32, marginHorizontal: 20 }}
          source={require('../../assets/logoavanci.png')}
        />
      </View>
      {/* <ImageBackground
        source={require('../../assets/logoavanci.png')}
        style={{ width: '100%', height: '100%' }}
      > */}
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 23, fontWeight: '400', color: '#f48024' }}>
            Recrutamento
          </Text>
          <BtnMenu
            lable="Nova Entrevista"
            icon="new"
            onPress={() => navigation.navigate('PersonalDataForm')}
          />
          <BtnMenu
            lable="Buscar Profissional"
            icon="search"
            onPress={() => navigation.navigate('Interviewed')}
          />
          <BtnMenu lable="Completar Cadastro" icon="complete" />
          <Text
            style={{
              fontSize: 23,
              fontWeight: '400',
              color: '#f48024',
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Pendências RH
          </Text>
          <BtnMenu lable="Adicionar Validação de CPF" icon="addfile" />
          <BtnMenu lable="Validar Documentação" icon="check" />

          <Text
            style={{
              fontSize: 23,
              fontWeight: '400',
              color: '#f48024',
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Diretoria
          </Text>
          <BtnMenu lable="Aprovar Contratação" icon="addperson" />
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            marginVertical: 30,
            alignItems: 'center',
            // borderTopWidth: 0.5,
            shadowColor: '#e1e1e1e1',
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.5,
            backgroundColor: '#fff',
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          <AntDesign
            name="user"
            size={20}
            color="#222426"
            style={{ marginLeft: 10 }}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '700',
              color: '#222426',
              flex: 1,
            }}
          >
            Igor Vinicius Avanci Rosa
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
}
