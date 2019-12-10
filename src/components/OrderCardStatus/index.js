import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const stylesOCStatus = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    borderRadius: 20,
  },
  text: { color: '#fff' },
});

export default function OrderCardStatus({ status }) {
  let statusColor = '#fff';

  // console.log(props.status);
  switch (status) {
    case 'Aguardando Cotação':
      statusColor = '#F44336';
      break;

    case 'Em Cotação':
      statusColor = '#1976D2';
      break;

    case 'Concluído':
      statusColor = '#388E3C';
      break;

    default:
      break;
  }

  return (
    <View style={[stylesOCStatus.container, { backgroundColor: statusColor }]}>
      <Text style={stylesOCStatus.text}>{status} </Text>
    </View>
  );
}
