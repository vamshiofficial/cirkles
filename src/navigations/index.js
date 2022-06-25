import React, {useContext} from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
// import BottomTabs from './bottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './appNav';
import AuthNav from './authNav';
import {AuthContext, AuthProvider} from './context/authContest';
import colors from '../../assets/custom/colors';
const AppNavigations = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <>
    <StatusBar backgroundColor={colors.PrimaryBlack} />
    <NavigationContainer>
      {/* {userToken !== null ? <AppNav /> : <AuthNav />} */}
      <AppNav />
    </NavigationContainer>
    </>
  );
};

export default AppNavigations;
