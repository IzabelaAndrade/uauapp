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
      {del ? (
        <TouchableOpacity
          disabled={!url}
          style={{
            width: 40,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginLeft: 10,
          }}
          onPress={onPressDelete}
        >
          <FontAwesome
            name="trash-o"
            size={25}
            color={url ? 'red' : '#eaeaea'}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}