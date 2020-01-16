import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

// import { Container } from './styles';

function JobIten({ item, onPress }) {
  const { check } = item;
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', height: 55, alignItems: 'center' }}
      onPress={() => {
        // c = !c;
        onPress(item);
      }}
    >
      <MaterialIcons
        name={check ? 'check-box' : 'check-box-outline-blank'}
        size={28}
        color="#f48024"
      />
      <Text style={{ marginLeft: 15, fontSize: 21, fontWeight: '400' }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

export default function MultiSelectPiker({ onPressClose, show, list }) {
  const [jobs, setjobs] = React.useState([]);
  const [listJobs, setlistJobs] = React.useState(list);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          paddingVertical: 30,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            margin: 30,
            borderRadius: 3,
            paddingBottom: 20,
          }}
        >
          <FlatList
            style={{ padding: 20 }}
            data={listJobs}
            renderItem={({ item }) => (
              <JobIten
                item={item}
                onPress={job => {
                  const list = jobs;
                  if (list.indexOf(`${job.title}, `) === -1) {
                    const add = listJobs.map((element, index) => {
                      if (element === job)
                        return Object.assign({}, element, {
                          check: true,
                        });
                      return element;
                    });
                    setlistJobs(add);
                    list.push(`${job.title}, `);
                  } else if (list.indexOf(`${job.title}, `) > -1) {
                    const rm = listJobs.map((element, index) => {
                      if (element === job)
                        return Object.assign({}, element, {
                          check: false,
                        });
                      return element;
                    });
                    setlistJobs(rm);
                    list.splice(list.indexOf(`${job.title}, `), 1);
                  }

                  setjobs(list);
                }}

                // onPress={job => {
                //   const list = jobs;
                //   if (list.indexOf(`${job.title}, `) === -1) {
                //     list.push(`${job.title}, `);
                //   } else if (list.indexOf(`${job.title}, `) > -1) {
                //     list.splice(`${job.title}, `, 1);
                //   }

                //   setjobs(list);
                // }}
              />
            )}
            keyExtractor={item => item.title}
            ListFooterComponent={() => <View style={{ padding: 10 }} />}
          />

          <TouchableHighlight
            style={{
              backgroundColor: '#f48024',
              width: 150,
              height: 40,
              borderRadius: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() => onPressClose(jobs)}
          >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>
              Confirmar
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
