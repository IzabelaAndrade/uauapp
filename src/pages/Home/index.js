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

    case 'lock':
      return <Feather name="lock" size={25} color="#bcbcbc" />;

    default:
      return <Feather name="chevron-right" size={25} color="#f48024" />;
  }
}

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);

  // 'Cadastro',
  // 'Gestão de Pessoas',
  // 'Financeiro Descontos',
  // 'Financeiro Lançamentos',
  // 'Financeiro Fechamento',
  // 'Financeiro Extrato Funcionário',
  // 'Permissões de Usuário',

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
        {user.permission.includes('Cadastro') ? (
          <>
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
              onPress={() =>
                navigation.navigate('Interviewed', { edit: false })
              }
            />
            <BtnMenu
              lable="Completar Cadastro"
              icon="complete"
              onPress={() => {
                dispatch(clearRegister());
                navigation.navigate('Interviewed', { edit: true });
              }}
            />
          </>
        ) : null}
        {user.permission.includes('Gestão de Pessoas') ? (
          <>
            <Text
              style={{
                fontSize: 23,
                fontWeight: '400',
                color: '#f48024',
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Gestão Pessoal
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
            />
          </>
        ) : null}
        {/* <Text
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
        <BtnMenu lable="Aprovar Contratação" icon="addperson" /> */}
        {user.permission.includes('Financeiro Descontos') ||
        user.permission.includes('Financeiro Lançamentos') ||
        user.permission.includes('Financeiro Fechamento') ||
        user.permission.includes('Financeiro Extrato Funcionário') ? (
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
        ) : null}
        {user.permission.includes('Financeiro Descontos') ? (
          <BtnMenu
            lable="Descontos"
            icon="minus"
            onPress={() => navigation.navigate('DiscountsForm')}
          />
        ) : null}
        {user.permission.includes('Financeiro Lançamentos') ? (
          <BtnMenu
            lable="Recebimentos"
            icon="plus"
            onPress={() => navigation.navigate('AdditionForm')}
          />
        ) : null}
        {user.permission.includes('Financeiro Fechamento') ? (
          <BtnMenu
            lable="Fechamento"
            icon="calculator"
            onPress={() => navigation.navigate('FinancialClose')}
          />
        ) : null}
        {user.permission.includes('Financeiro Extrato Funcionário') ? (
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
        ) : null}
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
        {user.permission.includes('Permissões de Usuário') ? (
          <BtnMenu
            lable="Parâmetros"
            icon="lock"
            onPress={() => {
              dispatch(clearRegister());
              navigation.navigate('UserList', {
                edit: false,
                origin: 'Settings',
              });
            }}
          />
        ) : null}
        <BtnMenu
          lable="Perfil"
          icon="profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </ScrollView>
    </View>
  );
}
