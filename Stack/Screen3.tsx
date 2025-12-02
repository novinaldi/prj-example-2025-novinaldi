import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

export default function Screen3() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Ini adalah Layar 3</Text>
      <Button onPress={() => navigation.navigate('Screen4')}>
        Go To Layar 4
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
});
