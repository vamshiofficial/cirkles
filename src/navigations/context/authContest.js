import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [isLoading, setisLoading] = useState(true);
  const [userToken, setuserToken] = useState(null);
  const [isFirstLaunch, setisFirstLaunch] = useState(null);
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
    let FirstLaunch = null;
    let UserToken = null;
    try {
      setisLoading(true);
      UserToken = await AsyncStorage.getItem('userToken');
      FirstLaunch = await AsyncStorage.getItem('alreadyLaunched');
    } catch (error) {
      console.log('login error', error);
    }
    if (FirstLaunch == null) {
      AsyncStorage.setItem('alreadyLaunched', 'true');
      setisFirstLaunch('true');
      setuserToken(UserToken);
      setTimeout(() => setisLoading(false), 5000);
    } else {
      setisFirstLaunch('false');
      setuserToken(UserToken);
      setTimeout(() => setisLoading(false), 5000);
    }
  };
  return (
    <AuthContext.Provider
      value={{test, LoginNow, LogOutNow, isLoading, userToken, isFirstLaunch}}>
      {children}
    </AuthContext.Provider>
  );
};
