import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index';
import FormLogin from './FormLogin';
import FormRegistrasi from './FormRegistrasi';
import { createTables, createUsersTable } from './Database';

const Stack = createNativeStackNavigator();
export default function Apps() {
  useEffect(() => {
    createUsersTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Login"
          component={FormLogin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Index}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={FormRegistrasi}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
