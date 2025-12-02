import React from 'react';
import { View, Platform } from 'react-native';
import {
  useLinkBuilder,
  useTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from '@react-native-vector-icons/ionicons';

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icons = {
    Home: 'home-outline',
    Profile: 'person-outline',
  };

  const activeIcons = {
    Home: 'home',
    Profile: 'person',
  };

  return (
    <View style={{ flexDirection: 'row' }}>
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
            <Ionicons
              name={isFocused ? activeIcons[route.name] : icons[route.name]}
              size={24}
              color={isFocused ? 'orange' : 'gray'}
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
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'My Home',
            headerShown: true,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'orange' },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: 'My Profile',
            headerShown: true,
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'orange' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
