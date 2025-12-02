import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

export default function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingBottom: 20,
        }}
      >
        DetailsScreen
      </Text>
      <Button onPress={() => navigation.navigate('Screen3')}>
        Go To Layar 3
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
