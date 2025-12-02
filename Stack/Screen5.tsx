import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

export default function Screen5() {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.container}>Ini adalah Layar 5</Text>
      <Button onPress={() => navigation.navigate('Home')} style={styles.button}>
        Go To HomeScreen
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { marginTop: 20, marginHorizontal: 10 },
});
