import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

import * as Animatable from 'react-native-animatable';
import {Container, Item} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const ENTER_AMOUNT = props => {
  //header
  // type
  // text
  return (
    <Container>
      <ScrollView>
        <Animatable.View
          animation={'slideInUp'}
          duration={500}
          style={styles.centeredView}>
          <View style={styles.header_sec}>
            <TouchableOpacity
              onPress={
                () => props.setCancelModal(true)
                // navigation.goBack()
              }
              style={[
                styles.close_btn,
                {marginTop: Platform.OS === 'android' ? 15 : 30},
              ]}>
              <Ionicons name="close-circle" style={styles.close_sheet_icon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.modalView]}>
            <Image
              source={{uri: props.ToUserProfileUrl}}
              style={styles.to_user_image}
            />
            {props.PaymentType === 'Outlet' ? (
              <Text style={styles.header_text}>
                Paying to {props.PayingToName} at {props.Address}
              </Text>
            ) : props.PaymentType === 'User' ? (
              <Text style={styles.header_text}>
                Paying to {props.PayingToName}
              </Text>
            ) : null}

            <View style={styles.main_view}>
              <View style={styles.balance_con}>
                <Text style={styles.balance_text}>{props.PayingUname} your ESY balance is: ₹<Text style={styles.balance_bold_text}>{props.TotalEsyAmount}</Text></Text>
              </View>
              <Text style={styles.body_text}>You are paying</Text>
              <View style={styles.input_row}>
                <Text style={styles.rupee_text}>₹</Text>
                <TextInput
                  placeholder="0"
                  style={[
                    styles.amount_input,
                    {paddingTop: Platform.OS === 'android' ? 20 : 0},
                  ]}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={e => props.EnteringAmount(e)}
                  // defaultValue={props.PayingAmount}
                />
              </View>
              {props.PayingAmountError ? (
                <Text style={styles.amount_error}>
                  Enter amount between 1 to 20 Only.
                </Text>
              ) : null}
            </View>
            <View style={styles.note_view}>
              <Text style={styles.note_text}>
                Note: This not your bank balance. It's just an amount that you
                won by rewards in our platforms. This is not linked to any
                banks/UPI's ... others.
              </Text>
              <TouchableOpacity style={styles.learn_more}>
                <Text style={styles.learn_more_text}>Learnmore.</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.action_btn}
              onPress={props.EnterPayPin}>
              <Text style={styles.action_btn_text}>Okay</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </Container>
  );
};

export default ENTER_AMOUNT;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header_sec: {
    height: 150,
    backgroundColor: colors.bglight,
  },
  modalView: {
    width: DeviceWidth,
    height: '100%',
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 25,
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
    fontSize: fonts.FontHeadding,
    alignSelf: 'center',
    color: colors.black1,
    marginTop: 15,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
  },
  main_view: {
    marginTop: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action_btn: {
    // alignSelf: 'flex-end',
    // position: 'absolute',
    // bottom: 100,
    // right: DeviceWidth * 0.05,
    width: DeviceWidth * 0.9,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: DeviceHeight * 0.05,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: colors.black,
    borderRadius: 25,
  },
  action_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.white,
    fontSize: 17,
    textTransform: 'uppercase',
  },
  input_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.bglight,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 15,
    width: '45%',
  },
  rupee_text: {
    fontSize: 30,
    fontFamily: fonts.PrimaryBoldFont,
  },
  amount_input: {
    fontSize: 30,
    fontFamily: fonts.PrimaryBoldFont,
    // textAlign: 'center',
  },
  note_view: {
    width: '100%',
    marginTop: DeviceHeight * 0.35,
  },
  note_text: {
    fontFamily: fonts.PrimaryFont,
    color: colors.white4,
  },
  learn_more: {
    // paddingLeft: 10,
  },
  learn_more_text: {
    color: colors.directs,
    fontFamily: fonts.PrimarySemiBoldFont,
  },
  close_btn: {
    alignSelf: 'flex-end',
    marginRight: 15,
    padding: 5,
  },
  close_sheet_icon: {
    fontSize: 25,
    color: colors.white3,
  },
  to_user_image: {
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
    borderRadius: DeviceWidth,
    borderColor: colors.black,
    borderWidth: 4,
    marginTop: -DeviceWidth * 0.15 - 25,
    backgroundColor: colors.white,
  },
  amount_error: {
    color: colors.red,
    fontFamily: fonts.PrimarySemiBoldFont,
    marginTop: 10,
  },
  // ===============balance
  balance_con:{
    borderColor:colors.bglight,
    borderWidth:2,
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius:25,
    borderStyle:'dashed',
    marginBottom:25,
  },
balance_text:{
  color: colors.black,
  fontFamily: fonts.PrimaryFont,
},
balance_bold_text:{
  color: colors.black,
  fontFamily: fonts.PrimaryBoldFont,
  fontSize:18
},
});
