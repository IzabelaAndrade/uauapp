import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from 'react-native';

const stylesInputForm = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  textlable: { fontWeight: '500', fontSize: 14 },
  textrequired: { color: 'red', fontWeight: 'bold' },
  btn: { minHeight: 40, justifyContent: 'center' },
  btntext: {
    fontSize: 21,
    fontWeight: '300',
  },
  input: {
    minHeight: 40,
    fontSize: 21,
    fontWeight: '300',
  },
});

export default function FildInputForm({
  lable,
  placeholder,
  value,
  list,
  androidList,
  onChangeText,
  onPress,
  onValueChange,
  keyboardType,
  maxLength,
  onEndEditing,
  multiline,
  required,
  disabled,
  multiselector,
}) {
  function renderPiker() {
    return (
      <View style={{}}>
        {multiselector ? (
          <TouchableOpacity
            style={stylesInputForm.btn}
            onPress={onPress}
            disabled={disabled}
          >
            <Text
              style={[
                stylesInputForm.btntext,
                { color: value ? '#000' : '#c4c4c6' },
              ]}
            >
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            enabled={!disabled}
            selectedValue={value}
            style={{
              color: value ? '#000' : '#c4c4c6',
              fontSize: 30,
              fontWeight: 'bold',
              height: 40,
              marginLeft: -10,
              justifyContent: 'center',
            }}
            itemStyle={{ color: 'red' }}
            onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
          >
            {androidList.map((element, index) => (
              <Picker.Item
                key={index}
                label={!element ? 'Selecione uma opção' : element}
                value={element === 'Selecione uma opção' ? '' : element}
              />
            ))}
          </Picker>
        )}
      </View>
    );
  }
  // const [nvalue, setnvalue] = React.useState('');
  return (
    <View style={stylesInputForm.container}>
      <Text style={stylesInputForm.textlable}>
        {lable}
        {required ? <Text style={stylesInputForm.textrequired}> *</Text> : null}
      </Text>
      {list ? (
        renderPiker()
      ) : (
        <TextInput
          style={[stylesInputForm.input]}
          keyboardType={keyboardType}
          returnKeyType="done"
          maxLength={maxLength}
          editable={!disabled}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          onChangeText={text => onChangeText(text)}
          onEndEditing={onEndEditing}
          value={value}
          multiline={multiline}
        />
      )}
    </View>
  );
}
