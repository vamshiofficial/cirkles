import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomSheet} from 'react-native-btr';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import main_styles from './styles';
import {useNavigation} from '@react-navigation/native';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const NextPaymentSheet = props => {
  const navigation = useNavigation();
  // console.log('sheet', props);
  const endTime = new Date(props.NextPayment).getTime();
  const [currentTime, setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; //177670892

  const seconds = 1000; // in milliseconds
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const remainingDays = Math.floor(gap / days);
  const remainingHours = Math.floor((gap % days) / hours);
  const remainingMinutes = Math.floor((gap % hours) / minutes);
  const remainingSeconds = Math.floor((gap % minutes) / seconds);

  useEffect(() => {
    setTimeout(() => setcurrentTime(new Date().getTime()), 1000);
  }, [currentTime]); // 11:30:55
  return (
    <BottomSheet
      visible={props.NextPaymentvisible}
      onBackButtonPress={() => props.setNextPaymentVisible(false)}
      onBackdropPress={() => props.setNextPaymentVisible(false)}>
      <View style={styles.bottomNavigationView}>
        <Text style={styles.heading_text}>Next payment limited</Text>
        <Text style={styles.note_text}>
          According to VAHH CIRCLE payments terms and policies one user can pay
          the outlet once per three days.You can still pay outlet by sharing
          your reward with your friend and let them pay at outlet.
        </Text>
        <Text style={styles.prev_date}>
          Previous Payment on:{props.PrevPaymentDate}
        </Text>
        <Text style={styles.next_date}>
          Next Payment on:{props.NextPaymentDate}
        </Text>
        <Text style={styles.next_pay_within}>You can pay after</Text>
        <View style={styles.countdown_row}>
          <View style={styles.countdown}>
            <Text style={styles.countdown_text}>{remainingDays}</Text>
            <Text style={styles.countdown_name}>Days</Text>
          </View>
          <View style={styles.countdown}>
            <Text style={styles.countdown_text}>{remainingHours}</Text>
            <Text style={styles.countdown_name}>Hours</Text>
          </View>
          <View style={styles.countdown}>
            <Text style={styles.countdown_text}>{remainingMinutes}</Text>
            <Text style={styles.countdown_name}>Minutes</Text>
          </View>
          <View style={styles.countdown}>
            <Text style={styles.countdown_text}>{remainingSeconds}</Text>
            <Text style={styles.countdown_name}>Seconds</Text>
          </View>
        </View>
        <View
          style={[
            main_styles.top_btn_grp,
            {
              borderTopColor: colors.bglight,
              paddingBottom: 15,
              borderTopWidth: 2,
              marginTop: 15,
            },
          ]}>
          <TouchableOpacity
            style={[main_styles.top_btn, {backgroundColor: colors.bglight}]}
            onPress={() => props.setNextPaymentVisible(false)}>
            <Ionicons name="checkmark-sharp" style={main_styles.top_icon} />
            <Text style={main_styles.top_btn_text}>Okay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[main_styles.top_btn, {backgroundColor: colors.green}]}
            onPress={() => {
              props.setNextPaymentVisible(false),
                navigation.navigate('SearchFriend');
            }}>
            <Ionicons
              name="md-arrow-redo-outline"
              style={[main_styles.top_icon, {color: colors.white}]}
            />
            <Text style={[main_styles.top_btn_text, {color: colors.white}]}>
              Gift to friend.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  // =====================count down
  bottomNavigationView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: (DeviceHeight * 85) / 100,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  countdown_row: {
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  countdown: {
    width: 45,
    height: 45,
    backgroundColor: colors.bglight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
    color: colors.green,
  },
  countdown_name: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSmall,
  },
  heading_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
    paddingVertical: 15,
  },
  note_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.white5,
  },
  prev_date: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontBody,
    color: colors.black,
    paddingTop: 8,
  },
  next_date: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontBody,
    color: colors.black,
    paddingTop: 8,
  },
  next_pay_within: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.green,
    marginTop: 25,
    textAlign: 'center',
  },
});

export default NextPaymentSheet;
