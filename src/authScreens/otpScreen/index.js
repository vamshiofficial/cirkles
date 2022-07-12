import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';
import styles from './styles';
import SubmitBtn from '../../appScreens/components/submitBtn';
import colors from '../../../assets/custom/colors';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigations/context/authContest';
import FullPageLoader from '../../appScreens/components/FullPageLoader';
import {Toast} from 'native-base';
import fonts from '../../../assets/custom/fonts';
const OtpVerifyModal = props => {
  // OtpModalVisible={}
  // setOtpModalVisible={}
  // setLoginModalVisible={}
  // OtpNumber={}
  // setOtpNumber={}
  // Mobile={}
  // ResendOtp={}
  // onSuccessFunction={}
  // LoadingText={}
  const {LoginNow} = useContext(AuthContext);
  // const [modalVisible, setModalVisible] = useState(true);
  const [PageLoader, setPageLoader] = useState(false);
  const [otp, setotp] = useState('');
  const [errorOtp, seterrorOtp] = useState(false)
  const [isAutoVerifyVisible, setisAutoVerifyVisible] = useState(true);
  //un comment below 41 to 67 lines to auto read OTP
  // useEffect(() => {
  //   RNOtpVerify.getHash().then(console.log).catch(console.log);

  //   RNOtpVerify.getOtp()
  //     .then(p => RNOtpVerify.addListener(otpHandler))
  //     .catch(p => console.log('from use effect', p));
  //   return () => {
  //     RNOtpVerify.removeListener();
  //   };
  // }, []);
  // const otpHandler = message => {
  //   try {
  //     setTimeout(() => {
  //       setisAutoVerifyVisible(false);
  //     }, 2000);
  //     console.log('message', message);
  //     const otpNum = /(\d{4})/g.exec(message)[1];
  //     console.log('otp,', otpNum);
  //     setotp(otpNum);
  //     CheckOtpNow(otpNum);
  //     RNOtpVerify.removeListener();
  //     Keyboard.dismiss();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // this.setState({ otp });
  // };
  const CheckOtpNow = (TheOtp) => {
    setPageLoader(true);
    if (TheOtp === props.OtpNumber) {
      seterrorOtp(false)
      // setPageLoader(false)
      var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        action: 'ACCOUNT_LOGIN_WITH_THIS_MOBILE',
        TheMobile: props.Mobile,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(RES => {
          if (RES[0].message !== 'FAILED') {
            // setPageLoader(false);
            // console.log('retrun message', RES[0].message);
            // console.log('retrun user mobile', RES[0].userMobile);
            // console.log('retrun user Id', RES[0].userId);
            props.onSuccessFunction();
          } else {
            alert('login failed');
          }
        })
        .catch(function (gg) {
          console.log(gg);
        });
    } else {
      setPageLoader(false);
      seterrorOtp(true)
      // alert('otp incorrect');
    }
  };
  const ChangeMobile = () => {
    setisAutoVerifyVisible(true);
    props.setOtpModalVisible(false);
    props.setLoginModalVisible(true);
  };
  const ToResendOtp = () => {
    props.ResendOtp(props.Mobile);
  };
  return (
    <View
      style={{flex: 1}}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.OtpModalVisible}
          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          //   // props.setOtpModalVisible(!props.OtpModalVisible);
          // }}
          >
          <View style={styles.centeredView}>
            <FullPageLoader
              visible={PageLoader}
              bigtext={props.LoadingText}
              text={'Please wait a sec'}
            />
            <View style={styles.bottomNavigationView}>
              <View style={styles.HeaderSection}>
                <Text style={styles.HedingText}>Verify OTP </Text>
                <Text style={styles.HeaderText}>
                  Please enter otp that we just to your mobile number (+91
                  {props.Mobile})
                </Text>
              </View>
              <View style={styles.BodySection}>
                <OTPInputView
                  style={{width: '70%', height: 100, alignContent: 'center'}}
                  pinCount={4}
                  code={otp}
                  keyboardType="phone-pad"
                  //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged={code => setotp(code)}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    CheckOtpNow(code);
                  }}
                />
                {isAutoVerifyVisible ? (
                  <View style={styles.autoVerifyCon}>
                    <ActivityIndicator
                      size={'small'}
                      color={colors.PrimaryBlack}
                    />
                    <Text style={styles.autoVerifyText}>
                      Trying to auto verify.
                    </Text>
                  </View>
                ) : (
                  <Animatable.View
                    style={styles.resendOtpCon}
                    animation={'fadeIn'}>
                    <TouchableOpacity
                      style={styles.changeNumBtn}
                      onPress={() => ChangeMobile()}>
                      <Text style={styles.changeNumText}>CHANGE MOBILE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.resendBtn}
                      onPress={() => ToResendOtp()}>
                      <Text style={styles.resendText}>RESEND</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
                {
                  errorOtp?
                  <Text style={styles.incorrectOtpText}>Otp is not correct!</Text>
                  :null
                }
              </View>
              <SubmitBtn
                onPress={() => {
                  CheckOtpNow(otp);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default OtpVerifyModal;
