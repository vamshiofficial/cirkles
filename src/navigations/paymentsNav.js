import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PayScanSheet from '../appScreens/rewardsScreen/payments/pay_scan';
const Stack = createStackNavigator();
const PaymentsNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="PayScanPage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PayScanPage"
        component={PayScanSheet}
        options={{
          animationEnabled: false,
          headerShown: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
export default PaymentsNav;
