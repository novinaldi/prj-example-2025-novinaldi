import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/Ionicons';
import { ipAddress } from './IpPublic'; 

export default function UserScreen() {
  return (
    <View>
      <Text>UserScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
