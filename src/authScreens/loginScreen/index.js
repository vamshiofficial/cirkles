import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import styles from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
import {Footer} from 'native-base';
import {BottomSheet} from 'react-native-btr';
import SubmitBtn from '../../appScreens/components/submitBtn';
import colors from '../../../assets/custom/colors';
import {AuthContext} from '../../navigations/context/authContest';
import OtpVerifyModal from '../otpScreen';
import UserMobileSvg from '../../../assets/images/user_mobile.svg';
import FullPageLoader from '../../appScreens/components/FullPageLoader';
const LoginScreen = props => {
  //getting user log value
  const {LoginNow, test} = useContext(AuthContext);
  const [Mobile, setMobile] = useState('');
  const [OtpModalVisible, setOtpModalVisible] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState(true);
  const [OtpNumber, setOtpNumber] = useState('');
  const [PageLoader, setPageLoader] = useState(false)
  const GetOtp = ThisMobile => {
    setPageLoader(true)
    if (ThisMobile.length <= 9) {
      alert('enter correct number');
      setPageLoader(false)
    } else {
      var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        action: 'SEND_OTP_TO_THIS_MOBILE',
        TheMobile: ThisMobile,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(RES => {
          if (RES[0].message !== 'CIRCLE_APP_OTP_FAILED') {
            // console.log('retrun otp', JSON.stringify(RES[0].otp));
            console.log('retrun message', RES[0].message);
            setLoginModalVisible(false);
            setOtpModalVisible(true);
            setOtpNumber(RES[0].otp);
            // LoginNow(UserToken,UserMobile);
          } else {
            // setModalVisible(true);
            // setModalType('fail');
            // setModalText('Incorrect details please try again!');
            // setTimeout(() => {
            //   setModalVisible(false);
            // }, 5000);
            alert('login failed');
          }
        })
        .catch(function (gg) {
          //handle error
          console.log(gg);
        });
    }
  };
  return (
    <View style={{flex: 1}}>
      <FullPageLoader
        visible={PageLoader}
        bigtext={'Getting OTP'}
        text={'Please wait a sec'}
      />
      <View style={styles.HeaderSection}>
        <Text style={styles.HedingText}>Login </Text>
        <Text style={styles.HeaderText}>
          This is simple and fast process you just need to enter your mobile
          number then you will get OTP to verify your identity.
        </Text>
        <Text>mobile:{Mobile}</Text>
      </View>
      <View style={styles.BodySection}>
        <View style={styles.formCon}>
          <TextInput
            placeholder="Enter mobile number"
            style={styles.mobileInput}
            maxLength={10}
            onChangeText={value => setMobile(value)}
            keyboardType="number-pad"
          />
        </View>
        <SubmitBtn
          onPress={() => {
            GetOtp(Mobile);
          }}
        />
        {OtpModalVisible ? (
          <OtpVerifyModal
            OtpModalVisible={OtpModalVisible}
            setOtpModalVisible={setOtpModalVisible}
            setLoginModalVisible={setLoginModalVisible}
            OtpNumber={OtpNumber}
            setOtpNumber={setOtpNumber}
            Mobile={Mobile}
            ResendOtp={GetOtp}
          />
        ) : null}
      </View>
    </View>
  );
};
export default LoginScreen;
