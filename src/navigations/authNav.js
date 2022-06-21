import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import OutletScreen from '../appScreens/outletScreen.js';
import LoginScreen from '../authScreens/loginScreen';
import RegisterScreen from '../authScreens/registerScreen';
import OnBoarding from '../authScreens/onBoarding';
import AccountSettingsScreen from '../appScreens/accountSettings';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const AuthNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
          options={{
            animationEnabled: false,
            headerShown: false,
            headerTitle: '',
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
      <Stack.Screen
        options={{
          animationEnabled: false,
        }}
        name="OutletScreen"
        component={OutletScreen}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
        }}
        name="AccountSettingsScreen"
        component={AccountSettingsScreen}
      />
      <Stack.Screen
        options={{
          animationEnabled: true,
          headerShown: false,
          headerTitle: '',
        }}
        name="OnBoardingScreen"
        component={OnBoarding}
      />
    </Stack.Navigator>
  );
}
export default AuthNav;
