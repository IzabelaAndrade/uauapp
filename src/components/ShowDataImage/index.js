import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';

// import { Container } from './styles';

export default function ShowDataImage({
  lable,
  caption,
  url,
  onPress,
  icon,
  onPressDelete,
  del,
  disabled,
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'photo':
        return require('../../assets/photo.png');

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
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
        disabled={disabled}
        onPress={() => onPress(url)}
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
            {caption}
          </Text>
        </View>
        <Image
          style={{ width: 55, height: 55 }}
          // source={{ uri: url }}
          source={url ? { uri: url } : renderIcon()}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
