import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.konten}>
        <View style={styles.box}>
          <Text>Hallo</Text>
        </View>
        <View style={styles.box}>
          <Text>Hallo</Text>
        </View>
        <View style={styles.box}>
          <Text>Hallo</Text>
        </View>
        <View style={styles.box}>
          <Text>Hallo</Text>
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    backgroundColor: 'red',
    margin: 10,
    borderEndEndRadius: 50,
  },
  konten: {
    flex: 6,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  footer: {
    flex: 1 / 2,
    backgroundColor: '#967ff0',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
