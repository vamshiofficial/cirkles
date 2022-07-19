import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../../assets/custom/colors';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import OtpVerifyModal from './otpVerifyModal';

const SplashScreen = () => {
  return (
    <View style={styles.SplashCon}>
      <Animatable.View animation={'zoomIn'} duration={1000} iterationCount={1}>
        <Image
          source={require('../../../assets/images/vahh_logo.jpeg')}
          style={styles.logo}
        />
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  SplashCon: {
    flex: 1,
    backgroundColor: colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: DeviceWidth * 0.7,
    height: DeviceWidth * 0.7,
    borderRadius: DeviceWidth * 0.4,
  },
});
