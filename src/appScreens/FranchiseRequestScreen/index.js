import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Body,
  Right,
  Form,
  Textarea,
  ListItem,
  CheckBox,
  Input,
} from 'native-base';
import colors from '../../../assets/custom/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FranchiseRequestModal from './successModal';
import FullPageLoader from '../components/FullPageLoader';
import OtpVerifyModal from '../../authScreens/otpScreen';
const FranchiseRequestScreen = () => {
  const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
  // input related
  const [UserMobile, setUserMobile] = useState();
  const [ChangeMobile, setChangeMobile] = useState(false);
  const [MobileValidation, setMobileValidation] = useState('');
  const [PhoneErrorText, setPhoneErrorText] = useState('');
  const [LocationDetails, setLocationDetails] = useState('');
  const [LocationDetailsValidation, setLocationDetailsValidation] =
    useState(false);
  const [Reasons, setReasons] = useState('');
  const [ReasonsValidation, setReasonsValidation] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  // otp related
  const [PageLoader, setPageLoader] = useState(false);
  const [OtpModalVisible, setOtpModalVisible] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState(true);
  const [OtpNumber, setOtpNumber] = useState('');
  useEffect(() => {
    const GetUserId = async () => {
      let id = '';
      let mobile = '';
      try {
        id = await AsyncStorage.getItem('userToken');
        mobile = await AsyncStorage.getItem('userMobile');
        setCurrect_UserId(id);
        setUserMobile(mobile);
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
  }, []);
  //----------------------
  const ValidatePhone = () => {
    const re = /^[6-9]{1}[0-9]{9}$/;
    var PhonePattern = UserMobile.match(re);
    if (UserMobile === '') {
      setMobileValidation(false);
      setPhoneErrorText('Please enter correct Mobile Number!');
    } else if (PhonePattern) {
      setMobileValidation(true);
      setPhoneErrorText('');
    } else {
      setMobileValidation(false);
      setPhoneErrorText('Enter correct Mobile Number!');
    }
  };
  // ---------------------
  const SendOtpToThisMobile = () => {
    ValidatePhone();
    if (
      UserMobile.toString().length === 10 &&
      LocationDetails.length > 10 &&
      Reasons.length > 10
    ) {
      setPageLoader(true);
      var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        action: 'SEND_OTP_TO_THIS_MOBILE',
        TheMobile: UserMobile,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(RES => {
          setPageLoader(false);
          if (RES[0].message !== 'CIRCLE_APP_OTP_FAILED') {
            console.log('retrun otp', JSON.stringify(RES[0].otp));
            console.log('retrun message', RES[0].message);
            setLoginModalVisible(false);
            setOtpModalVisible(true);
            setOtpNumber(RES[0].otp);
          } else {
            alert('login failed');
          }
        })
        .catch(function (gg) {
          console.log(gg);
        });
    } else {
      alert('enter correct details');
    }
  };
  // -----------------
  const SubmitForm = () => {
    setOtpModalVisible(false);
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      action: 'ADD_THIS_FRANCHISE_REQUEST',
      TheUserID: Currect_UserId,
      TheMobile: UserMobile,
      TheMobileVerified: MobileValidation,
      TheLocation: LocationDetails,
      TheReasons: Reasons,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(RES => {
        setPageLoader(false);
        if (RES !== 'REQUEST_FAILED') {
          console.log(RES);
          setSuccessModalVisible(!SuccessModalVisible);
          setLocationDetails('');
          setReasons('');
        } else {
          alert('failed');
        }
      })
      .catch(function (gg) {
        console.log(gg);
      });
  };
  return (
    <Container>
      {OtpModalVisible ? (
        <OtpVerifyModal
          OtpModalVisible={OtpModalVisible}
          setOtpModalVisible={setOtpModalVisible}
          setLoginModalVisible={setLoginModalVisible}
          OtpNumber={OtpNumber}
          setOtpNumber={setOtpNumber}
          Mobile={UserMobile}
          ResendOtp={SendOtpToThisMobile}
          onSuccessFunction={SubmitForm}
          LoadingText={'Posting your request'}
        />
      ) : null}
      <ScrollView>
        <FullPageLoader
          visible={PageLoader}
          bigtext={'Getting OTP'}
          text={'Please wait a sec'}
        />
        <ImageBackground
        borderBottomLeftRadius={35}
        borderBottomRightRadius={35}
          source={{
            uri: 'https://esigm.com/thecircle/v1/used_images/franchise_bg.png',
          }}
          style={styles.header_bg_img}>
          <Text style={styles.header_heading_text}>Ohoo Vamshi</Text>
          <Text style={styles.header_text}>
            We are happy that you want to join our misssion to serve people with
            our Tea & snacks.
          </Text>
        </ImageBackground>
        <View style={styles.body_con}>
          <Text style={styles.NoteText}>
            Let us know some details about your location and reasons to approve
            the outlet.So please verify and answer the followings.
          </Text>
          <View style={styles.formCon}>
            <Form>
              <Text style={styles.LableText}>Mobile number:</Text>
              {ChangeMobile ? (
                <Input
                  style={styles.mobileInput}
                  defaultValue={UserMobile}
                  onChangeText={e => setUserMobile(e)}
                  onBlur={() => ValidatePhone()}
                />
              ) : (
                <Input
                  placeholder="Mobile number"
                  style={[
                    styles.mobileInput,
                    {backgroundColor: colors.bglight},
                  ]}
                  disabled
                  defaultValue={UserMobile}
                />
              )}
              <ListItem
                noBorder
                style={{marginLeft: 0}}
                onPress={() => setChangeMobile(!ChangeMobile)}>
                <CheckBox checked={ChangeMobile} color={colors.black} />
                <Body>
                  <Text
                    style={[
                      styles.changeMobileText,
                      {color: ChangeMobile ? colors.black : colors.black3},
                    ]}>
                    Change number
                  </Text>
                </Body>
              </ListItem>
              <Text style={styles.error_text}>{PhoneErrorText}</Text>
              <Text style={styles.LableText}>Location:</Text>
              <Textarea
                style={styles.locationInput}
                rowSpan={5}
                placeholder="Please add address
Village/City
Pincode
District,State"
                onChangeText={e => setLocationDetails(e)}
                defaultValue={LocationDetails}
              />
              <Text style={styles.LableText}>Reasons:</Text>
              <Textarea
                style={styles.ResonsInput}
                rowSpan={5}
                placeholder="What motivates you to get this interest?"
                onChangeText={e => setReasons(e)}
                defaultValue={Reasons}
              />
            </Form>
          </View>
          <TouchableOpacity
            style={styles.submit_btn}
            onPress={() => {
              SendOtpToThisMobile();
            }}>
            <Text style={styles.submit_btn_text}>SUBMIT</Text>
          </TouchableOpacity>
          <FranchiseRequestModal
            visible={SuccessModalVisible}
            setVisible={setSuccessModalVisible}
            UserMobile={UserMobile}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default FranchiseRequestScreen;
