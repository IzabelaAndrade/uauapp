import React, { useEffect } from 'react';
import { View, Text, Image, SectionList } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useSelector } from 'react-redux';
import Cpf from '../../utils/Cpf';
import Money from '../../utils/Money';
import api from '../../services/api';
import HeaderForm from '../../components/HeaderForm';

const dbDateFormat = 'YYYY-MM-DD';

const FinancialHeader = ({ data, financesData, loading }) => {
  const img = data.Files.find(element => element.type === 'photo');
  console.log(financesData);
  return (
    <View style={{ marginHorizontal: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 25 }}
          source={img ? { uri: img.url } : require('../../assets/avatar.png')}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: '500', fontSize: 18 }}>{data.name}</Text>
          <Text style={{ color: 'grey', fontSize: 13 }}>
            {Cpf.format(data.cpf)}
          </Text>
        </View>
      </View>
      {!data.BankAccount ? (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '500', fontSize: 15, color: '#bdbdbd' }}>
              Titular:{' '}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 15, color: '#bdbdbd' }}>
              CPF:{' '}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 15, color: '#bdbdbd' }}>
              Banco:{' '}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 15, color: '#bdbdbd' }}>
              Agência:{' '}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 15, color: '#bdbdbd' }}>
              Conta:{' '}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
            }}
          >
            {!loading ? (
              <>
                <Text style={{ fontWeight: '300', fontSize: 12 }}>
                  Saldo Real
                </Text>
                <Text
                  style={{
                    color:
                      financesData.balance.substring(0, 1) === '-'
                        ? 'red'
                        : 'green',
                    fontSize: 15,
                    fontWeight: '500',
                    marginBottom: 10,
                  }}
                >
                  {financesData.balance.substring(0, 1) === '-'
                    ? `- ${Money.format(financesData.balance)}`
                    : Money.format(financesData.balance) || '0,00'}
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 20 }}>
                  Saldo no Mês
                </Text>
                <Text
                  style={{
                    color:
                      financesData.balance_month.substring(0, 1) === '-'
                        ? 'red'
                        : 'green',
                    fontSize: 23,
                    fontWeight: '700',
                  }}
                >
                  {financesData.balance_month.substring(0, 1) === '-'
                    ? `- ${Money.format(financesData.balance_month)}`
                    : Money.format(financesData.balance_month) || '0,00'}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>
                  Titular:{' '}
                </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                  {data.BankAccount.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>CPF: </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                  {Cpf.format(data.BankAccount.cpf)}
                </Text>
              </View>
              <Text style={{ fontWeight: '500', fontSize: 15 }}>
                Banco:{' '}
                <Text
                  style={{ color: 'grey', fontSize: 15, fontWeight: 'normal' }}
                >
                  {data.BankAccount.bank}
                </Text>
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>Ag: </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                  {data.BankAccount.agency}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>Cc: </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                  {data.BankAccount.account}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}
            >
              {!loading ? (
                <>
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 12,
                    }}
                  >
                    Saldo Real
                  </Text>
                  <Text
                    style={{
                      color:
                        financesData.balance.substring(0, 1) === '-'
                          ? 'red'
                          : 'green',
                      fontSize: 15,
                      fontWeight: '500',
                      marginBottom: 10,
                    }}
                  >
                    {financesData.balance.substring(0, 1) === '-'
                      ? `- ${Money.format(financesData.balance)}`
                      : Money.format(financesData.balance) || '0,00'}
                  </Text>

                  <Text style={{ fontWeight: '500', fontSize: 20 }}>
                    Saldo no Mês
                  </Text>
                  <Text
                    style={{
                      color:
                        financesData.balance_month.substring(0, 1) === '-'
                          ? 'red'
                          : 'green',
                      fontSize: 23,
                      fontWeight: '700',
                    }}
                  >
                    {financesData.balance_month.substring(0, 1) === '-'
                      ? `- ${Money.format(financesData.balance_month)}`
                      : Money.format(financesData.balance_month) || '0,00'}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

function Item({ data }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          // marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 12, color: '#898989' }}>
          {moment(data.date, dbDateFormat).format('ddd')}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#898989' }}>
          {moment(data.date, dbDateFormat).format('DD')}
        </Text>
        <Text style={{ fontSize: 12, color: '#898989' }}>
          {moment(data.date, dbDateFormat).format('MMM')}
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          padding: 10,
          borderColor: '#898989',
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text
            style={{
              // color: 'green',
              color: data.transaction_type ? 'red' : 'green',
              fontSize: 25,
              fontWeight: '700',
            }}
          >
            {data.transaction_type ? '-' : '+'}
          </Text>
          <Text
            style={{
              marginTop: 2,
              marginLeft: 5,
              color: 'gray',
              fontSize: 13,
            }}
          >
            {Money.format(data.value)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Text style={{ marginLeft: 5, color: 'gray', fontSize: 13 }}>
            {data.type} {data.description ? ` - ${data.description}` : null}
          </Text>
        </View>
      </View>
    </View>
  );
}

const FinancialItem = ({ statement }) => {
  if (statement.length < 1) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#e6e6e6',
          }}
        >
          <Text style={{ color: '#898989', fontSize: 18 }}>
            Não há histórico
          </Text>
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Image
            style={{ width: 130, height: 130, borderRadius: 25 }}
            source={require('../../assets/emptyC.png')}
          />
        </View>
      </View>
    );
  }
  return (
    <SectionList
      stickySectionHeadersEnabled
      sections={statement}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item data={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#e6e6e6',
          }}
        >
          <Text style={{ color: '#898989', fontSize: 18 }}>
            {moment(title, dbDateFormat).format('MMMM')} -{' '}
            {moment(title, dbDateFormat).format('YYYY')}
          </Text>
        </View>
      )}
    />
  );
};

export default function FinancialDetailed({ navigation }) {
  const [bankStatement, setBankStatement] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { person } = navigation.state.params;
  const user = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    async function getFinancialData() {
      let response = null;
      try {
        response = await api.get(`/finacialprofile?user=${person.uuid}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(signOut());
          // setRefresh(false);
        }
        console.log(error.response);
        return error;
      }
      // console.log(response.data);
      setBankStatement(response.data);
      setLoading(false);
    }
    getFinancialData();
  }, [person, user]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        back
        onPressBack={() => navigation.goBack()}
      />
      <FinancialHeader
        data={person}
        financesData={bankStatement}
        loading={loading}
      />
      {/* <ViewSwitch onSelect={text => setViewSelected(text)} /> */}
      {/* <FinancialSelectDate onSelect={text => setDateFilterSelected(text)} /> */}
      {loading ? null : <FinancialItem statement={bankStatement.statement} />}
      {/* {viewSelected === 'Extrato' ? (
      ) : (
        <FinancialRelease />
      )} */}
    </View>
  );
}
