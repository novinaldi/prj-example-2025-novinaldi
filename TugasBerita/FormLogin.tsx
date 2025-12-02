import React, { useState } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { verifyLogin } from './Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Fungsi untuk login
  const handleLogin = () => {
    if (username && password) {
      verifyLogin(username, password)
        .then(user => {
          AsyncStorage.setItem('user', JSON.stringify(user)); //Perintah untuk menyimpan data user secara lokal
          navigation.navigate('Tabs');
        })
        .catch(error => {
          Alert.alert('Login Gagal', error);
        });
    } else {
      Alert.alert('Peringatan', 'Username dan Password harus diisi');
    }
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          Belum punya akun? Daftar di sini
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#2596be',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerText: {
    color: '#fff',
    marginTop: 20,
  },
});

export default FormLogin;
