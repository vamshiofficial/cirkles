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
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as Animatable from 'react-native-animatable';
import {Container, Content} from 'native-base';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Generate_Pin from '../../settingsScreen/pages/generate_pin';
const ENTER_ESY_PIN = props => {
  const navigation = useNavigation();
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
                {marginTop: Platform.OS === 'android' ? 10 : 30},
              ]}>
              <Ionicons name="close-circle" style={styles.close_sheet_icon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.modalView]}>
            <>
              {props.userPaymentsPin !== 'none' ? (
                <>
                  <Text style={styles.header_text}>Esy pin</Text>
                  <Text style={styles.body_text}>
                    Enter your ESY pin below.
                  </Text>
                  <OTPInputView
                    style={{width: '70%', height: 100, alignContent: 'center'}}
                    pinCount={4}
                    code={props.PinInput}
                    keyboardType="phone-pad"
                    onCodeChanged={code => props.setPinInput(code)}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      props.CheckPayPinNow(code);
                    }}
                  />
                  {props.PinError ? (
                    <View style={styles.row_error}>
                      <Text style={styles.pin_error}>Entered pin is in correct.</Text>
                      <TouchableOpacity style={styles.learn_more} onPress={props.GenerateThePin}>
                      <Text style={styles.learn_more_text}>Update Pin.</Text>
                    </TouchableOpacity>
                    </View>
                  ) : null}
                  <View style={styles.note_view}>
                    <Text style={styles.note_text}>
                      Note: This not your bank balance. It's just an amount that
                      you won by rewards in our platforms. This is not linked to
                      any banks/UPI's ... others.
                    </Text>
                    <TouchableOpacity style={styles.learn_more}>
                      <Text style={styles.learn_more_text}>Learnmore.</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <TouchableOpacity
                    style={styles.action_btn}
                    // onPress={props.closePaying}
                  >
                    <Text style={styles.action_btn_text}>Okay</Text>
                  </TouchableOpacity> */}
                </>
              ) : (
                <View>
                  <View style={styles.note_view}>
                    <Text style={styles.note_text}>
                      It's look like you have not set your payments PIN for the
                      transactions.Please click on below to create Pin.
                    </Text>
                    <TouchableOpacity style={styles.learn_more}>
                      <Text style={styles.learn_more_text}>Learnmore.</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.action_btn}
                    onPress={props.GenerateThePin}>
                    <Text style={styles.action_btn_text}>Genetate Pin</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          </View>
        </Animatable.View>
      </ScrollView>
    </Container>
  );
};

export default ENTER_ESY_PIN;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header_sec: {
    height: 200,
    backgroundColor: colors.directs,
  },
  modalView: {
    marginTop: -25,
    width: DeviceWidth,
    height: '100%',
    // minHeight: DeviceHeight * 0.8,
    // maxHeight: DeviceHeight,
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
    fontSize: fonts.FontMainHeading,
    alignSelf: 'center',
    color: colors.black,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
  },
  action_btn: {
    alignSelf: 'center',
    width: DeviceWidth * 0.9,
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
  underlineStyleBase: {
    width: DeviceWidth * 0.12,
    height: DeviceWidth * 0.12,
    borderWidth: 1,
    alignItems: 'center',
    color: colors.black,
    // borderBottomWidth: 0,
  },

  underlineStyleHighLighted: {
    borderColor: colors.black,
  },
  note_view: {
    width: '100%',
    marginTop: DeviceHeight * 0.15,
  },
  note_text: {
    fontFamily: fonts.PrimaryFont,
    color: colors.white4,
    flexWrap: 'wrap',
  },
  learn_more: {
    paddingLeft: 0,
    marginTop: 0,
    marginLeft: 0,
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
    color: colors.white,
  },
  row_error:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:colors.bglight
  },
  pin_error:{
    color: colors.red,
    fontFamily: fonts.PrimarySemiBoldFont,
    textAlign:'center',
    // width:'100%',
    marginVertical:10,
    marginRight:10
  }
});
