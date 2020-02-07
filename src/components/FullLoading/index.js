import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

export default function FullLoading({ loading }) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={loading}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}
    >
      <View
        style={{
          marginTop: 22,
          backgroundColor: 'rgba(255,255,255,.6)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
          }}
        >
          <ActivityIndicator size="large" color="#f48024" />
        </View>
      </View>
    </Modal>
  );
}
