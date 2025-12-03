import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'react-native-linear-gradient';
import { ipAddress } from './IpPublic';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ipAddress}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('MainApp');
      } else {
        setLoading(false);
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error', `An error occurred: ${error}`);
    }
  };

  return (
    <LinearGradient
      colors={['#313647', '#435663']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Silahkan Login</Text>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="mail" type="feather" size={24} color="white" />}
          value={email}
          onChangeText={setEmail}
          inputStyle={styles.inputStyle}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Password"
          leftIcon={
            <Icon name="lock-closed" type="feather" size={24} color="white" />
          }
          value={password}
          onChangeText={setPassword}
          inputStyle={styles.inputStyle}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.textLoginButton}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputStyle: {
    color: 'white',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#FFF8D4',
    borderRadius: 10,
    paddingVertical: 12,
  },
  textLoginButton: {
    color: '#313647',
    fontWeight: 'bold',
    fontSize: 15,
  },

  registerText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default LoginForm;
