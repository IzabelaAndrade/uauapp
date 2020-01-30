import React, { useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';

import HeaderForm from '../../components/HeaderForm';

import {
  modifyPhoto,
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
  modifyMaritalStatus,
  modifyDependents,
  modifyHome,
  modifyPostalCode,
  modifyNeighborhood,
  modifyAddress,
  modifyTransport,
  modifyHabilitation,
  modifyLastJob,
  modifyTimeJob,
  modifyTypeJob,
  modifyDescriptionJob,
  modifyBank,
  modifyAccountType,
  modifyAgency,
  modifyOperation,
  modifyAccountNumber,
  modifyHolder,
  modifyHolderCPF,
  modifyShirt,
  modifyPants,
  modifyShoes,
  modifyDocFront,
  modifyDocBack,
  modifyImgVoterTitle,
  modifyImgAddress,
} from '../../store/modules/register/actions';

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
  const { edit } = navigation.state.params;
  const { mode } = navigation.state.params;

  const img = person.Files.find(element => element.type === 'photo');

  const [disabledBanck, setdisabled] = React.useState(!person.BankAccount);
  const [disabledDocs, setdisabledDocs] = React.useState(!person.Files);

  const dispatch = useDispatch();
  // const register = useSelector(state => state.register);

  useEffect(() => {
    if (person.Files) {
      const photo = person.Files.find(element => element.type === 'photo');
      const docFront = person.Files.find(
        element => element.type === 'docFront'
      );
      const docBack = person.Files.find(element => element.type === 'docBack');
      const vTitle = person.Files.find(
        element => element.type === 'voterTitle'
      );
      const address = person.Files.find(element => element.type === 'address');

      dispatch(modifyPhoto(photo.url));
      dispatch(modifyDocFront(docFront.url));
      dispatch(modifyDocBack(docBack.url));
      dispatch(modifyImgVoterTitle(vTitle.url));
      dispatch(modifyImgAddress(address.url));
    }
    dispatch(modifyName(person.name));
    dispatch(modifyRG(person.rg));
    dispatch(modifyCPF(person.cpf));
    dispatch(modifyVoterTitle(person.voter_title));
    dispatch(modifyEmail(person.email));
    dispatch(modifyBirthday(person.birthday));
    dispatch(modifyPhone(person.phone));
    dispatch(modifyEducation(person.education));
    dispatch(modifyHability(person.hability));
    dispatch(modifyReference(person.reference));
    dispatch(modifyMaritalStatus(person.marital_status));
    dispatch(modifyDependents(person.dependents));
    dispatch(modifyHome(person.home));
    dispatch(modifyPostalCode(person.postal_code));
    dispatch(modifyNeighborhood(person.neighborhood));
    dispatch(modifyAddress(person.address));
    dispatch(modifyTransport(person.transport));
    dispatch(modifyHabilitation(person.habilitation));
    dispatch(modifyLastJob(person.professional_experience.lastJob));
    dispatch(modifyTimeJob(person.professional_experience.timeJob));
    dispatch(modifyTypeJob(person.professional_experience.typeJob));
    dispatch(
      modifyDescriptionJob(person.professional_experience.descriptionJob)
    );
    dispatch(modifyBank(person.BankAccount.bank));
    dispatch(modifyAccountType(person.BankAccount.type));
    dispatch(modifyAgency(person.BankAccount.agency));
    dispatch(modifyOperation(person.BankAccount.operation));
    dispatch(modifyAccountNumber(person.BankAccount.account));
    dispatch(modifyHolder(person.BankAccount.name));
    dispatch(modifyHolderCPF(person.BankAccount.cpf));
    dispatch(modifyShirt(person.shirt_size));
    dispatch(modifyPants(person.pants_size));
    dispatch(modifyShoes(person.boot_size));
  }, [dispatch, person]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="SocioeconomicForm"
        back
        // iconRight="edit"
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 10,
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
              marginTop: 10,
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
              edit
                ? navigation.navigate('EditPersonalData', {
                    screen: 'PersonalData',
                    data: person,
                  })
                : navigation.navigate('ShowData', {
                    screen: 'PersonalData',
                    data: person,
                  })
            }
          />
          <BtnData
            caption="Socio Econômicos"
            icon="profile"
            onPress={() =>
              edit
                ? navigation.navigate('EditSocioeconomicData', {
                    data: person,
                  })
                : navigation.navigate('ShowData', {
                    screen: 'Socioeconomic',
                    data: person,
                  })
            }
          />
          <BtnData
            caption="Experiências Profissionais"
            icon="tool"
            onPress={() =>
              edit
                ? navigation.navigate('EditReferenceData', {
                    data: person,
                  })
                : navigation.navigate('ShowData', {
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
              edit
                ? navigation.navigate('EditFinancesData')
                : navigation.navigate('ShowData', {
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
              edit
                ? navigation.navigate('EditDocumentsData')
                : navigation.navigate('ShowData', {
                    screen: 'Docs',
                    data: person.Files,
                  })
            }
          />
          {mode === 'edit' ? (
            <BtnData
              caption="Regime de Contrato"
              icon="copy1"
              disabled={disabledDocs}
              onPress={() =>
                navigation.navigate('ShowData', {
                  screen: 'Docs',
                  data: person.Files,
                })
              }
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
