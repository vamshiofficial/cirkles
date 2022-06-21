import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LoginScreen from './loginScreen';
const OnBoarding = () => {
  return (
    <View style={{flex:1}}>
    <Onboarding
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={{uri:'https://upload.wikimedia.org/wikipedia/en/9/96/Jana_Sena_Party_Logo.jpeg'}} style={{width:'50%',height:'50%'}} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={{uri:'https://upload.wikimedia.org/wikipedia/en/9/96/Jana_Sena_Party_Logo.jpeg'}} style={{width:'50%',height:'50%'}} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={{uri:'https://upload.wikimedia.org/wikipedia/en/9/96/Jana_Sena_Party_Logo.jpeg'}} style={{width:'50%',height:'50%'}} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={{uri:'https://upload.wikimedia.org/wikipedia/en/9/96/Jana_Sena_Party_Logo.jpeg'}} style={{width:'50%',height:'50%'}} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
    ]}
  />
  <LoginScreen
  visible={true}
  setVisible={false}
  />
  </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({})