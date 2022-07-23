import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
const PayScanerSheet = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop:40}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Text>PayScanerSheet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PayScanerSheet;
