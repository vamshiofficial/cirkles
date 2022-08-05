import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import OutletScreen from '../appScreens/outletScreen.js';
import LoginScreen from '../authScreens/loginScreen';
import RegisterScreen from '../authScreens/registerScreen';
import OnBoarding from '../authScreens/onBoarding';
import AccountSettingsScreen from '../appScreens/accountSettings';
import AppNav from './appNav.js';
import SettingsScreen from '../appScreens/settingsScreen/index.js';
import SettingsScreensNav from './settingsNav';
import FranchiseRequestScreen from '../appScreens/FranchiseRequestScreen/index.js';
import colors from '../../assets/custom/colors.js';
import AllOutletsScreen from '../appScreens/allOutletsScreen/index.js';
import PaymentsSection from '../appScreens/rewardsScreen/payments/index.js';
import SearchFriend from '../appScreens/rewardsScreen/payments/search_frd.js';
import PayOutletScaner from '../appScreens/rewardsScreen/payments/pay_scan.js';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const AuthNav = () => {
  return (
    // AppNav
    <Stack.Navigator
      initialRouteName="AppNav"
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
        }}
        name="AllOutletsScreen"
        component={AllOutletsScreen}
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
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
        }}
        name="SettingsScreen"
        component={SettingsScreensNav}
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
      <Stack.Screen
        options={{
          animationEnabled: true,
          headerShown: false,
          headerTitle: '',
        }}
        name="AppNav"
        component={AppNav}
      />
      <Stack.Screen
        options={{
          animationEnabled: true,
          headerShown: false,
          headerTitle: '',
        }}
        name="PaymentsSection"
        component={PaymentsSection}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
        }}
        name="PayOutletScaner"
        component={PayOutletScaner}
      />
      <Stack.Screen
        options={{
          animationEnabled: true,
          headerShown: false,
          headerTitle: '',
        }}
        name="SearchFriend"
        component={SearchFriend}
      />
      <Stack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.white,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
        name="FranchiseRequestScreen"
        component={FranchiseRequestScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthNav;
