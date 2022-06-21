import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
// import BottomTabs from './bottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './appNav';
import AuthNav from './authNav';
import {AuthContext, AuthProvider} from './context/authContest';
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
    <NavigationContainer>
      {userToken !== null ? <AppNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppNavigations;
