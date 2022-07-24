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
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const ENTER_AMOUNT = props => {
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
            backgroundColor: colors.bglight,
          },
        ]}>
        <KeyboardAvoidingView>
          <View style={[styles.modalView]}>
            <Text style={styles.header_text}>Paying to Vamshi at Siddipet</Text>
            <View style={styles.main_view}>
              <Text style={styles.body_text}>You are paying</Text>
              <View style={styles.input_row}>
                <Text style={styles.rupee_text}>₹</Text>
                <TextInput
                  placeholder="0"
                  style={styles.amount_input}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={styles.note_view}>
              <Text style={styles.note_text}>
                Note: This not your bank balance. It's just an amount that you
                won by rewards in our platforms. This is not linked to any
                banks/UPI's ... others.
                <TouchableOpacity style={styles.learn_more}>
                  <Text style={styles.learn_more_text}>Learnmore.</Text>
                </TouchableOpacity>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.action_btn}
              // onPress={props.closePaying}
            >
              <Text style={styles.action_btn_text}>Okay</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ENTER_AMOUNT;

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
    alignSelf: 'center',
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
  input_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.bglight,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 15,
    width: '40%',
  },
  rupee_text: {
    fontSize: 35,
    fontFamily: fonts.PrimaryBoldFont,
  },
  amount_input: {
    fontSize: 35,
    fontFamily: fonts.PrimaryBoldFont,
    textAlign: 'center',
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
    paddingLeft: 10,
    marginTop: -2,
  },
  learn_more_text: {
    color: colors.directs,
    fontFamily: fonts.PrimarySemiBoldFont,
  },
});
