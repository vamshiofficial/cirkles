import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LoginScreen from './loginScreen';
import colors from '../../assets/custom/colors';
import fonts from '../../assets/custom/fonts';
import {useNavigation} from '@react-navigation/native';
const OnBoarding = () => {
  const Done = params => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.done_btn}>
        <Text style={styles.done_text}>Okay</Text>
      </TouchableOpacity>
    );
  };
  const Skip = ({...props}) => {
    return (
      <TouchableOpacity style={styles.left_btn} {...props}>
        <Text style={styles.left_text}>Skip</Text>
      </TouchableOpacity>
    );
  };
  const Next = ({...props}) => {
    return (
      <TouchableOpacity style={styles.right_btn} {...props}>
        <Text style={styles.right_text}>Next</Text>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Onboarding
        DoneButtonComponent={Done}
        onSkip={() => navigation.navigate('Home')}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        titleStyles={styles.title_style}
        subTitleStyles={styles.subTitleStyles}
        bottomBarColor="white"
        imageContainerStyles={
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            // height: '70%',
          }
        }
        // containerStyles={{backgroundColor:colors.white,paddingTop:0,marginTop:0}}
        pages={[
          {
            backgroundColor: colors.white,
            image: (
              <ImageBackground
                source={require('../../assets/images/vahh_logo.jpeg')}
                // resizeMode="cover"
                style={{width: 150, height: 150}}
              />
            ),
            title: 'Welcome to VAHH circle',
            subtitle: 'Where you can find exclusive tasts with the rewards.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/images/get_reward.png')}
                style={{width: 200, height: 200}}
              />
            ),
            title: 'Get Instant Reward',
            subtitle:
              'Get the reward each time when you scan a Qr code at our outlet.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/images/reward_winner.png')}
                style={{width: 200, height: 200}}
              />
            ),
            title: 'Pay or Share Reward',
            subtitle:
              'You can use your reward amount as real money at our outlet.or you can share your rewarded amount with your friends and families.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/images/franchise.png')}
                style={{width: 200, height: 200}}
              />
            ),
            title: 'Get our franchise at low cost',
            subtitle:
              'You can get the outlet at low cost and get high returns.Apply for franchise in two steps.',
          },
        ]}
      />
      {/* <LoginScreen
  visible={true}
  setVisible={false}
  /> */}
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  title_style: {
    color: colors.black,
    fontFamily: fonts.PrimaryBoldFont,
  },
  subTitleStyles: {
    color: colors.white5,
    fontFamily: fonts.PrimaryFont,
    paddingHorizontal: 25,
  },
  done_btn: {
    marginRight: 15,
  },
  done_text: {
    color: colors.black,
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'capitalize',
  },
  left_btn: {
    marginLeft: 15,
  },
  left_text: {
    color: colors.black,
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'capitalize',
  },
  right_btn: {
    marginRight: 15,
  },
  right_text: {
    color: colors.black,
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'capitalize',
  },
});
