import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, Button, Text } from 'react-native-elements';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
      }}
    >
      <Avatar
        rounded
        size="xlarge"
        source={require('./assets/img/novi.jpg')}
        containerStyle={{ marginBottom: 15 }}
      />
      <Text h4 style={{ marginBottom: 5 }}>
        Novinaldi
      </Text>
      <Text style={{ color: '#6c757d', textAlign: 'center', marginBottom: 20 }}>
        Dosen & Pengembang Aplikasi Berbasis Web dan Mobile.
      </Text>
      <Button
        title="Hubungi Saya"
        icon={
          <Ionicons
            name="call"
            type="feather"
            color="white"
            style={{ marginRight: 8 }}
          />
        }
        buttonStyle={{
          backgroundColor: '#2596be',
          borderRadius: 30,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
