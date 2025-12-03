import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipAddress } from '../IpPublic';

const UserScreen = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
              try {
                const response = await fetch(`${ipAddress}/logout`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });

                const data = await response.json();
                if (response.ok) {
                  await AsyncStorage.removeItem('userToken');
                  navigation.replace('Login');
                } else {
                  Alert.alert('Error', data.message || 'Logout failed');
                }
              } catch (error) {
                Alert.alert('Error', `An error occurred: ${error}`);
              }
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        navigation.replace('Login');
        return;
      }

      try {
        const response = await fetch(`${ipAddress}/data-pengguna`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          Alert.alert('Error', data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        Alert.alert('Error', `An error occurred: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar
          rounded
          size="xlarge"
          source={
            user?.photo
              ? { uri: user.photo }
              : require('./../assets/img/novi.jpg')
          }
          containerStyle={styles.avatar}
        />
        <Text style={styles.username}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: '#d31a1a',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Icon name="log-out-outline" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 10 }}>
              Keluar Aplikasi
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  avatar: {
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 30,
  },
});

export default UserScreen;
