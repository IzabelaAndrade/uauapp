import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default function FildImageForm({
  lable,
  caption,
  icon,
  value,
  onPress,
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'docFront':
        return require('../../assets/contactf.png');

      case 'docBack':
        return require('../../assets/contactv.png');

      case 'voterTitle':
        return require('../../assets/voter.png');

      case 'address':
        return require('../../assets/address.png');

      case 'check':
        return require('../../assets/check.png');

      default:
        return require('../../assets/contactv.png');
    }
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 21,
            fontWeight: '300',
            color: '#000',
          }}
        >
          {lable}
        </Text>
        <Text style={{ fontWeight: '300' }}>{caption} </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{ width: 50, height: 40 }}
          // source={renderIcon()}
          source={value ? require('../../assets/check.png') : renderIcon()}
        />
      </TouchableOpacity>
    </View>
  );
}
