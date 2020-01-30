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

function JobIten({ item, onPress, checked }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', height: 55, alignItems: 'center' }}
      onPress={() => onPress(item)}
    >
      <MaterialIcons
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={28}
        color="#f48024"
      />
      <Text style={{ marginLeft: 15, fontSize: 21, fontWeight: '400' }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
}

export default function MultiSelectPiker({
  onPressConfirm,
  show,
  dataList,
  selectedList,
}) {
  const [selectedJobs, setselectedJobs] = React.useState(selectedList);
  const AddOrRemove = job => {
    const index = selectedJobs.indexOf(job);
    if (index === -1) {
      setselectedJobs([...selectedJobs, job]);
    } else {
      setselectedJobs(selectedJobs.filter(element => !(element === job)));
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={show}
      onRequestClose={() => {}}
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
            data={dataList}
            renderItem={({ item }) => (
              <JobIten
                item={item}
                onPress={job => AddOrRemove(job)}
                checked={!!selectedJobs.find(job => item === job)}
              />
            )}
            keyExtractor={item => item}
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
            onPress={() => onPressConfirm(selectedJobs)}
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

// job => {
//   const listj = jobs;
//   if (listj.indexOf(`${job.title}, `) === -1) {
//     const add = listJobs.map((element, index) => {
//       if (element === job)
//         return Object.assign({}, element, {
//           check: true,
//         });
//       return element;
//     });
//     setlistJobs(add);
//     listj.push(`${job.title}, `);
//   } else if (listj.indexOf(`${job.title}, `) > -1) {
//     const rm = listJobs.map((element, index) => {
//       if (element === job)
//         return Object.assign({}, element, {
//           check: false,
//         });
//       return element;
//     });
//     setlistJobs(rm);
//     listj.splice(listj.indexOf(`${job.title}, `), 1);
//   }

//   setjobs(listj);
// }
