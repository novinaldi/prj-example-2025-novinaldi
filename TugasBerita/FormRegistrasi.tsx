import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from './Database';

const FormRegistrasi = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [namalengkap, setNamalengkap] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (username && password && email && namalengkap) {
      registerUser(username, password, email, namalengkap)
        .then(() => {
          Alert.alert('Sukses', 'Akun berhasil dibuat');
          navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Gagal', 'Terjadi kesalahan saat membuat akun');
        });
    } else {
      Alert.alert('Peringatan', 'Semua kolom harus diisi');
    }
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text h3 style={styles.title}>
          Daftar Akun
        </Text>

        <Input
          label="Username"
          placeholder="Masukkan Username"
          value={username}
          onChangeText={setUsername}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          label="Password"
          placeholder="Masukkan Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          label="Email"
          placeholder="Masukkan Email"
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          value={namalengkap}
          onChangeText={setNamalengkap}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Button
          title="Daftar"
          buttonStyle={styles.button}
          onPress={handleRegister}
        />

        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login')}
        >
          Sudah punya akun? Login di sini
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#2596be',
    borderRadius: 5,
    paddingVertical: 15,
  },
  linkText: {
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default FormRegistrasi;
