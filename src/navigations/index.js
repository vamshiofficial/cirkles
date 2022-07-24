import React, {useContext} from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
// import BottomTabs from './bottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './appNav';
import AuthNav from './authNav';
import {AuthContext, AuthProvider} from './context/authContest';
import colors from '../../assets/custom/colors';
import SplashScreen from '../appScreens/components/splashScreen';
const AppNavigations = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size={'large'} />
        {/* <SplashScreen /> */}
      </View>
    );
  }
  return (
    <>
    <StatusBar backgroundColor={colors.PrimaryBlack} />
    <NavigationContainer>
      {/* {userToken !== null ? <AppNav /> : <AuthNav />} */}
      <AuthNav />
      {/* <AppNav /> */}
    </NavigationContainer>
    </>
  );
};

export default AppNavigations;
