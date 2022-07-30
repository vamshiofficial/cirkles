import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import fonts from '../../../../assets/custom/fonts';
import colors from '../../../../assets/custom/colors';
import RNOtpVerify from 'react-native-otp-verify';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const Generate_Pin = props => {
  // useEffect(() => {
  //   RNOtpVerify.getHash().then(console.log).catch(console.log);
  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(otpHandler))
  //     .catch(p => console.log(p));
  //   return () => RNOtpVerify.removeListener();
  // }, []);
  // const otpHandler = message => {
  //   console.log('message', message);
  //   const otpNum = /(\d{4})/g.exec(message)[1];
  //   console.log('otp,', otpNum);
  //   setotp(otpNum);
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  //   // this.setState({ otp });
  // };
  const [Mobile, setMobile] = useState('yes')
  useEffect(() => {
    const GetUserId = async () => {
      let id = '';
      try {
        id = await AsyncStorage.getItem('userMobile');
        setMobile(id);
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
  }, [])
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.GeneratePinModal}
        onRequestClose={
          () =>
            // {
            //   Alert.alert('Modal has been closed.');
            props.setGeneratePinModal(false)
          // }
        }>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.PinCreateSucess ? (
              <View style={styles.sucess_con}>
                <Ionicons
                  name="checkmark-circle"
                  style={[styles.big_checked_icon, {color: colors.green}]}
                />
                <Text style={styles.sucess_text}>
                  Your pin created Successfully.You can use it when doing
                  payments in all our platforms.
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '90%',
                }}>
                <Text style={styles.headingText}>Create/Update ESY PIN</Text>
                <Text style={styles.enter_otp}>Enter Otp</Text>
                <Text style={styles.enter_otp_text}>
                  Enter Otp that we just sent to your mobile number
                  ({Mobile}).
                </Text>
                <View style={styles.otp_input_con}>
                  <OTPInputView
                    style={styles.otp_con}
                    pinCount={4}
                    //   code={props.PinInput}
                    keyboardType="phone-pad"
                    //   onCodeChanged={code => props.setPinInput(code)}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      props.CheckOtpNow(code);
                    }}
                  />
                  <View style={styles.icon_con}>
                    {props.OtpNumberVerify ? (
                      <Ionicons
                        name="checkmark-circle"
                        style={[styles.checked_icon, {color: colors.green}]}
                      />
                    ) : (
                      <Ionicons
                        name="close-circle"
                        style={[styles.checked_icon, {color: colors.red}]}
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.new_pin}>Enter New Pin</Text>
                <OTPInputView
                  style={styles.otp_con}
                  pinCount={4}
                  //   code={props.PinInput}
                  keyboardType="phone-pad"
                  //   onCodeChanged={code => props.setPinInput(code)}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    props.CreateNewPinNow(code);
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Generate_Pin;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    paddingTop: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  otp_con: {
    width: '60%',
    height: 50,
    alignContent: 'flex-start',
    marginTop: 15,
  },
  headingText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    color: colors.black,
    marginBottom:15,
    borderBottomWidth:1,
    width:'100%',
    paddingBottom:15,
    borderColor:colors.white1
  },
  enter_otp: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    textAlign: 'left',
    width: '100%',
    color: colors.black1,
  },
  enter_otp_text: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontBody,
    textAlign: 'left',
    width: '100%',
    // marginLeft: 30,
    color: colors.black4,
  },
  new_pin: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSubHeadding,
    textAlign: 'left',
    width: '100%',
    // marginLeft: 30,
    marginTop: 20,
    color: colors.black1,
  },
  underlineStyleBase: {
    width: DeviceWidth * 0.11,
    height: DeviceWidth * 0.11,
    alignItems: 'center',
    color: colors.black,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: colors.black,
    borderBottomWidth: 1,
  },
  otp_input_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon_con: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  checked_icon: {
    fontSize: 25,
  },
  //   =========success
  sucess_con: {
    width: '100%',
    alignItems: 'center',
  },
  big_checked_icon: {
    fontSize: 150,
  },
  sucess_text: {
    fontSize: fonts.FontSubHeadding,
    textAlign: 'center',
    width: '80%',
  },
});
