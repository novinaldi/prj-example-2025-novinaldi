import React, { useState, useEffect } from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import ActivityScreen from './src/ActivityScreen';
import ScanQrScreen from './src/ScanQrScreen';
import ReportScreen from './src/ReportScreen';
import UserScreen from './src/UserScreen';
import Icon from '@react-native-vector-icons/ionicons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icons = {
    Home: 'home-outline',
    Activity: 'file-tray-stacked-outline',
    Scan: 'qr-code-outline',
    Report: 'document-outline',
    User: 'person-outline',
  };

  const activeIcons = {
    Home: 'home',
    Activity: 'file-tray-stacked',
    Scan: 'qr-code',
    Report: 'document',
    User: 'person',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        elevation: 2,
        borderTopColor: '#2596be',
        borderTopWidth: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f8f9fa',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <Icon
              name={isFocused ? activeIcons[route.name] : icons[route.name]}
              size={24}
              color={isFocused ? '#2596be' : 'gray'}
            />

            <Text style={{ color: isFocused ? '#2596be' : 'gray' }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#2596be' },
          }}
        />

        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#2596be' },
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanQrScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#2596be' },
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#2596be' },
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#2596be' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
