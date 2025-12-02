import React from 'react';
import { View, Platform } from 'react-native';
import {
  useLinkBuilder,
  useTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './ArtikelScreen';
import AlbumScreen from './AlbumScreen';
import ProfileScreen from './ProfileScreen';
import IconDen from '@react-native-vector-icons/ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InformasiScreen from './informasi/StackInformasi';
import ContactPersonScreen from './ContactPersonScreen';

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icons = {
    Info: 'information-circle-outline',
    Artikel: 'documents-outline',
    Album: 'images-outline',
    Profile: 'person-outline',
    Setting: 'settings-outline',
    Contact: 'call-outline',
  };

  const activeIcons = {
    Info: 'information-circle',
    Artikel: 'documents',
    Album: 'images',
    Profile: 'person',
    Setting: 'settings',
    Contact: 'call',
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
            <IconDen
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

export default function Index() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Artikel"
        component={HomeScreen}
        options={{
          headerTitle: 'My Home',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#2596be' },
        }}
      />
      <Tab.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          headerTitle: 'My Album',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#2596be' },
        }}
      />
      <Tab.Screen
        name="Info"
        component={InformasiScreen}
        options={{
          headerTitle: 'Informasi',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#2596be' },
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactPersonScreen}
        options={{
          headerTitle: 'Contact',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#2596be' },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'My Profile',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#2596be' },
        }}
      />
    </Tab.Navigator>
  );
}
