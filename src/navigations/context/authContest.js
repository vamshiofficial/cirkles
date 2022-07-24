import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(true);
  const [userToken, setuserToken] = useState(null);
  const test = 'test';
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  const LoginNow = (UserToken, UserMobile) => {
    const TheUserToken = String(UserToken);
    const TheUserMobile = String(UserMobile);
    setisLoading(true);
    setuserToken(TheUserToken);
    AsyncStorage.setItem('userToken', TheUserToken);
    AsyncStorage.setItem('userMobile', TheUserMobile);
    setTimeout(() => setisLoading(false), 100);
  };
  const LogOutNow = () => {
    setisLoading(true);
    setuserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userMobile');
    setTimeout(() => setisLoading(false), 5000);
  };
  const isUserLoggedIn = async () => {
    try {
      setisLoading(true);
      let UserToken = await AsyncStorage.getItem('userToken');
      setuserToken(UserToken);
      setTimeout(() => setisLoading(false), 5000);
    } catch (error) {
      console.log('login error', error);
    }
  };
  return (
    <AuthContext.Provider
      value={{test, LoginNow, LogOutNow, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
