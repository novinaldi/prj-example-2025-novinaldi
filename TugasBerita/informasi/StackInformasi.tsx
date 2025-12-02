import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InformasiData from './Data';
import FrmTambahData from './FormTambahInformasi';
import FrmEditInformasi from './FormEditInformasi';

const Stack = createNativeStackNavigator();
export default function StackInformasi() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InformasiData"
        component={InformasiData}
        options={{
          headerTitle: 'Data Informasi',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2596be',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="FormAddInformasi"
        component={FrmTambahData}
        options={{
          headerTitle: 'Tambah Informasi',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2596be',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="FormEditInformasi"
        component={FrmEditInformasi}
        options={{
          headerTitle: 'Edit Informasi',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2596be',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
