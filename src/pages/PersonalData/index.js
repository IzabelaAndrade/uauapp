import React, { useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

import HeaderForm from '../../components/HeaderForm';

// import { Container } from './styles';

function BtnData({ onPress, caption, icon, disabled }) {
  return (
    <TouchableOpacity
      style={{
        height: 80,
        marginHorizontal: 20,
        borderBottomWidth: 0.5,
        borderColor: '#bcbcbc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 21,
          fontWeight: '400',
          color: disabled ? '#bcbcbc' : '#000',
        }}
      >
        {caption}
      </Text>
      <AntDesign
        name={icon}
        size={28}
        color={disabled ? '#bcbcbc' : '#f48024'}
      />
    </TouchableOpacity>
  );
}

export default function PersonalData({ navigation }) {
  const { person } = navigation.state.params;
  const img = person.Files.find(element => element.type === 'photo');

  const [disabledBanck, setdisabled] = React.useState(!person.BankAccount);
  const [disabledDocs, setdisabledDocs] = React.useState(!person.Files);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="SocioeconomicForm"
        back
        iconRight="edit"
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 20,
            shadowColor: '#e1e1e1e1',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            marginBottom: 10,
            backgroundColor: '#fff',
          }}
        >
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: img.url }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: '400',
              alignSelf: 'center',
              marginTop: 20,
            }}
          >
            {person.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <BtnData
            caption="Dados Pessoais"
            icon="user"
            onPress={() =>
              navigation.navigate('ShowData', {
                screen: 'PersonalData',
                data: person,
              })
            }
          />
          <BtnData
            caption="Socio Econômicos"
            icon="profile"
            onPress={() =>
              navigation.navigate('ShowData', {
                screen: 'Socioeconomic',
                data: person,
              })
            }
          />
          <BtnData
            caption="Experiências Profissionais"
            icon="tool"
            onPress={() =>
              navigation.navigate('ShowData', {
                screen: 'Reference',
                data: person.professional_experience,
              })
            }
          />
          <BtnData
            caption="Dados Bancários"
            icon="wallet"
            disabled={disabledBanck}
            onPress={() =>
              navigation.navigate('ShowData', {
                screen: 'FinancesData',
                data: person.BankAccount,
              })
            }
          />
          <BtnData
            caption="Documentos"
            icon="folderopen"
            disabled={disabledDocs}
            onPress={() =>
              navigation.navigate('ShowData', {
                screen: 'Docs',
                data: person.Files,
              })
            }
          />
        </View>
      </View>
    </View>
  );
}
