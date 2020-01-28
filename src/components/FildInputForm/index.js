import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function FildInputForm({
  lable,
  placeholder,
  value,
  list,
  onChangeText,
  onPress,
  keyboardType,
  maxLength,
  onEndEditing,
}) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
      }}
    >
      <Text style={{ fontWeight: '500', fontSize: 14 }}>{lable}</Text>
      {list ? (
        <TouchableOpacity
          style={{
            height: 40,
            justifyContent: 'center',
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontSize: 21,
              fontWeight: '300',
              color: value ? '#000' : '#c4c4c6',
            }}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          style={{
            height: 40,
            fontSize: 21,
            fontWeight: '300',
          }}
          keyboardType={keyboardType}
          returnKeyType="done"
          maxLength={maxLength}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          onChangeText={text => onChangeText(text)}
          onEndEditing={onEndEditing}
          value={value}
        />
      )}
    </View>
  );
}
