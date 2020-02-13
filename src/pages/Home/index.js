import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';

import { useDispatch, useSelector } from 'react-redux';

import { Feather, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { clearRegister } from '../../store/modules/register/actions';

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

    case 'contract':
      return <AntDesign name="copy1" size={25} color="#bcbcbc" />;

    case 'addperson':
      return <MaterialIcons name="assignment-ind" size={25} color="#bcbcbc" />;

    case 'profile':
      return <AntDesign name="user" size={25} color="#bcbcbc" />;

    case 'plus':
      return <AntDesign name="pluscircleo" size={22} color="#bcbcbc" />;

    case 'minus':
      return <AntDesign name="minuscircleo" size={22} color="#bcbcbc" />;

    case 'calculator':
      return <Entypo name="calculator" size={25} color="#bcbcbc" />;

    case 'history':
      return <Feather name="list" size={25} color="#bcbcbc" />;

    default:
      return <Feather name="chevron-right" size={25} color="#f48024" />;
  }
}

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRegister());
  });

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
          elevation: 6,
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
      <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
        {/* <View > */}
        <Text style={{ fontSize: 23, fontWeight: '400', color: '#f48024' }}>
          Recrutamento
        </Text>
        <BtnMenu
          lable="Nova Entrevista"
          icon="new"
          onPress={() => {
            dispatch(clearRegister());
            navigation.navigate('PersonalDataForm');
          }}
        />
        <BtnMenu
          lable="Buscar Profissional"
          icon="search"
          onPress={() => navigation.navigate('Interviewed', { edit: false })}
        />
        <BtnMenu
          lable="Completar Cadastro"
          icon="complete"
          onPress={() => {
            dispatch(clearRegister());
            navigation.navigate('Interviewed', { edit: true });
          }}
        />
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
        <BtnMenu
          lable="Validar Documentação"
          icon="check"
          onPress={() => {
            dispatch(clearRegister());
            navigation.navigate('Interviewed', {
              edit: true,
              origin: 'EditDocumentsData',
            });
          }}
        />
        <BtnMenu
          lable="Regime de Contrato"
          icon="contract"
          onPress={() =>
            navigation.navigate('Interviewed', {
              origin: 'ContractData',
            })
          }
          // onPress={() => navigation.navigate('ContractData')}
        />

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
        <Text
          style={{
            fontSize: 23,
            fontWeight: '400',
            color: '#f48024',
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Financeiro
        </Text>
        <BtnMenu
          lable="Descontos"
          icon="minus"
          onPress={() => navigation.navigate('DiscountsForm')}
        />
        <BtnMenu
          lable="Recebimentos"
          icon="plus"
          onPress={() => navigation.navigate('AdditionForm')}
        />
        <BtnMenu
          lable="Fechamento"
          icon="calculator"
          onPress={() => navigation.navigate('FinancialClose')}
        />
        <BtnMenu
          lable="Histórico Financeiro"
          icon="history"
          onPress={() => {
            dispatch(clearRegister());
            navigation.navigate('Interviewed', {
              edit: false,
              origin: 'FinancialDetailed',
            });
          }}
        />
        <Text
          style={{
            fontSize: 23,
            fontWeight: '400',
            color: '#f48024',
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Configurações
        </Text>
        <BtnMenu
          lable="Perfil"
          icon="profile"
          onPress={() => navigation.navigate('Profile')}
        />
        {/* </View> */}
        {/* <TouchableOpacity
          style={{
            borderTopWidth: Platform.OS === 'ios' ? 0 : 0.5,
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
            {user.name}
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
}
