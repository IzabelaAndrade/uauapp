import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const stylesOCIcon = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  value: {
    minWidth: 20,
    height: 20,

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
    zIndex: 1,
  },
  icon: {
    marginRight: 10,
    backgroundColor: '#eeeeee',
    width: 45,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function OrderCardIcon(props) {
  const { type, value } = props;

  const getIcon = icon => {
    switch (type) {
      case 'numberOfExcluded':
        return icon ? 'trash-2' : '#F44336';

      case 'quantityDelivery':
        return icon ? 'truck' : '#388E3C';

      case 'quantityOfItems':
        return icon ? 'list' : '#1976D2';

      default:
        return '#fff';
    }
  };

  return (
    <View style={stylesOCIcon.container}>
      {value < 1 ? null : (
        <View style={[stylesOCIcon.value, { backgroundColor: getIcon() }]}>
          <Text style={{ color: '#fff', marginHorizontal: 3 }}>{value}</Text>
        </View>
      )}
      <View style={stylesOCIcon.icon}>
        <Feather
          name={getIcon('icon')}
          size={20}
          color={value < 1 ? '#bcbcbc' : '#f48024'}
        />
      </View>
    </View>
  );
}
