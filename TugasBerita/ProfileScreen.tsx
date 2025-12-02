import { Alert, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Text } from 'react-native-elements';
import Ionicons from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengambil data pengguna');
      }
    };

    getUserData();
  }, []);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user'); // Menghapus data pengguna dari AsyncStorage
              navigation.navigate('Login'); // Arahkan ke halaman login setelah logout
            } catch (error) {
              console.log('Error during logout:', error);
              Alert.alert('Error', 'Terjadi kesalahan saat logout');
            }
          },
        },
      ],
      { cancelable: false }, // Menghindari keluar dari alert saat menekan luar dialog
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const formatRupiah = angka => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={require('./assets/img/novi.jpg')} // Ganti dengan foto pengguna jika ada
        containerStyle={{ marginBottom: 15 }}
      />
      <Text h4 style={{ marginBottom: 5 }}>
        {user.username}
      </Text>
      <Text style={{ color: '#6c757d', textAlign: 'center', marginBottom: 20 }}>
        Email : {user.email}
        {'\n'}
        {user.namalengkap}
        {'\n'}
        Saldo anda : {formatRupiah(10000)}
      </Text>
      <Button
        title="Logout"
        icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
        buttonStyle={styles.logoutButton}
        onPress={handleLogout} // Panggil fungsi logout saat tombol ditekan
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#2596be',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
