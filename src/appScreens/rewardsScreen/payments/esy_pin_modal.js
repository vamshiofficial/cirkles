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
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const ENTER_ESY_PIN = props => {
  const [otp, setotp] = useState('');
  const [errorOtp, seterrorOtp] = useState(false);
  //header
  // type
  // text
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.EnterPinModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: colors.directs,
          },
        ]}>
        <View style={[styles.modalView]}>
          <Text style={styles.header_text}>Enter Esy pin</Text>
          <Text style={styles.body_text}>pin used to make transactions</Text>
          <OTPInputView
            style={{width: '70%', height: 100, alignContent: 'center'}}
            pinCount={4}
            code={otp}
            keyboardType="phone-pad"
            onCodeChanged={code => setotp(code)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled={code => {
            // //   CheckOtpNow(code);
            // }}
          />
          <TouchableOpacity
            style={styles.action_btn}
            // onPress={props.closePaying}
          >
            <Text style={styles.action_btn_text}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ENTER_ESY_PIN;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: DeviceWidth,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 25,
    minHeight: DeviceHeight * 0.8,
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
    alignSelf: 'flex-start',
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
  },
  action_btn: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 25,
    right: DeviceWidth * 0.05,
    width: DeviceWidth * 0.9,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
});
