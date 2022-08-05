import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import * as Animatable from 'react-native-animatable';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
const PayingModal = props => {
  //header
  // type
  // text
  // props.PayingModalVisible
  return (
    <Animatable.View animation={'slideInUp'} duration={500} style={{flex: 1}}>
      {props.PModalType === 'loading' ? (
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: colors.bglight,
            },
          ]}>
          <View style={[styles.modalView]}>
            <ActivityIndicator size={'large'} color={colors.Primary} />
            <Text style={styles.header_text}>{props.PModalType}</Text>
            <Text style={styles.body_text}>{props.PBodyText}</Text>
          </View>
        </View>
      ) : props.PModalType === 'success' ? (
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Animatable.View
            style={styles.HeaderSection}
            animation={'bounce'}
            duration={1000}
            delay={500}>
            <Animatable.View
              style={styles.success_icon_con}
              animation={'bounceIn'}
              iterationCount={5}>
              <Ionicons
                name="md-checkmark-done-circle-sharp"
                style={styles.success_icon}
              />
            </Animatable.View>
            <View>
              <Text style={styles.HedingText}>Transaction Successful </Text>
              <Text style={styles.amount_text}>
                ₹ {props.TransAmount} rupees only.
              </Text>
            </View>
          </Animatable.View>
          <Animatable.View
            style={styles.BodySection}
            animation={'fadeInUp'}
            duration={1000}
            delay={800}>
            <View style={styles.sent_to_con}>
              <Text style={styles.sent_to_}>Sent to</Text>
            </View>
            <View style={[styles.row, {marginBottom: 25}]}>
              <Image
                source={{uri: props.TransToUserPic}}
                style={styles.to_user_image}
              />
              <View style={styles.user_con}>
                <Text style={styles.user_name}>{props.TransToUserName}</Text>
                <Text style={styles.mobile_num}>{props.TransDisplayName}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.table_bold_text}>Transaction ID:</Text>
              <Text style={styles.table_text}>{props.TransId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.table_bold_text}>Transaction Time:</Text>
              <Text style={styles.table_text}>{props.TransTime}</Text>
            </View>
            <Text style={styles.HeaderText}>{props.PBodyText}</Text>
          </Animatable.View>
        </View>
      ) : props.PModalType === 'failed' ? (
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: colors.opens,
            },
          ]}>
          <View style={[styles.modalView]}>
            <Text style={styles.header_text}>{props.PModalType}</Text>
            <Text style={styles.body_text}>{props.PBodyText}</Text>
          </View>
        </View>
      ) : null}
    </Animatable.View>
  );
};

export default PayingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    // paddingTop:DeviceHeight*0.2
  },
  modalView: {
    width: DeviceWidth * 0.9,
    marginBottom: DeviceHeight * 0.1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 25,
    // minHeight: DeviceHeight * 0.25,
    maxHeight: DeviceHeight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    textAlign: 'left',
    color: colors.black,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
  },
  action_btn: {
    alignSelf: 'flex-end',
    marginVertical: 20,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: colors.PrimaryBlack,
    borderRadius: 5,
  },
  action_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.white,
  },
  // =========================success modal
  HeaderSection: {
    height: DeviceHeight * 0.2,
    width: DeviceWidth,
    flexDirection: 'row',
    backgroundColor: colors.green,
    // paddingBottom: 60,
    paddingVertical: 30,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  success_icon_con: {
    // backgroundColor: colors.w,
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  success_icon: {
    fontSize: 70,
    color: colors.white,
  },
  HedingText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
    color: colors.white,
  },
  amount_text: {
    color: colors.white1,
    fontSize: fonts.FontMainHeading,
    fontFamily: fonts.PrimaryBoldFont,
  },
  HeaderText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black,
    marginTop: 45,
    backgroundColor: colors.bglight,
    padding: 25,
  },
  BodySection: {
    flex: 1,
    // backgroundColor: colors.white,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 40,
    marginTop: 0,
    paddingHorizontal: DeviceWidth * 0.05,
    // marginBottom: -35,
  },
  sent_to_con: {
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingVertical: 15,
    borderBottomColor: colors.white1,
  },
  sent_to_: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.black,
    textTransform: 'uppercase',
  },
  to_user_image: {
    width: DeviceWidth * 0.18,
    height: DeviceWidth * 0.18,
    borderRadius: DeviceWidth,
    borderColor: colors.black,
    borderWidth: 0,
    alignSelf: 'center',
    // marginTop: -DeviceWidth * 0.15 - 25,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  table_bold_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white5,
  },
  table_text: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white4,
    marginLeft: 5,
  },
  user_con: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  user_name: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
    color: colors.black,
  },
  mobile_num: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white3,
  },
});
