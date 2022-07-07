import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AboutPage from '../appScreens/settingsScreen/pages/AboutPage';
import SettingsScreen from '../appScreens/settingsScreen';
import TermsConditionsPage from '../appScreens/settingsScreen/pages/terms_conditions';
import PrivacyPolicyPage from '../appScreens/settingsScreen/pages/privacy_policy';
const Stack = createStackNavigator();

const SettingsScreensNav = () => {
  return (
    <Stack.Navigator
    initialRouteName="PrivacyPolicyPage"
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="SettingsPage" component={SettingsScreen} 
      options={{
        animationEnabled: false,
        headerShown: false,
        headerTitle: '',
      }} 
      />
      <Stack.Screen name="AboutPage" component={AboutPage} 
       options={{
        animationEnabled: false,
        headerShown: false,
        headerTitle: '',
      }}
      />
      <Stack.Screen name="TermsConditionsPage" component={TermsConditionsPage} 
       options={{
        animationEnabled: false,
        headerShown: false,
        headerTitle: '',
      }}
      />
       <Stack.Screen name="PrivacyPolicyPage" component={PrivacyPolicyPage} 
       options={{
        animationEnabled: false,
        headerShown: false,
        headerTitle: '',
      }}
      />
      {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
    </Stack.Navigator>
  )
}

export default SettingsScreensNav