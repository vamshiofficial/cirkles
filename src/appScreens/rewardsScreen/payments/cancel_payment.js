import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import fonts from '../../../../assets/custom/fonts';
import colors from '../../../../assets/custom/colors';
import RNOtpVerify from 'react-native-otp-verify';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const CancelPaymentModal = props => {
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={props.CancelModal}
        onRequestClose={
          () =>
            // {
            //   Alert.alert('Modal has been closed.');
            props.setCancelModal(false)
          // }
        }>
        <Pressable style={styles.centeredView}  onPress={() => props.setCancelModal(false)}>
          <View style={styles.modalView}>
            <View style={styles.sucess_con}>
              <MaterialCommunityIcons
                name="cancel"
                style={styles.big_cancel_icon}
              />
              <Text style={styles.sucess_text}>
                Are you sure you want to cancel this payment.
              </Text>
            </View>
            <View style={styles.row_btns}>
              <TouchableOpacity
                style={styles.btn_yes}
                onPress={() => {
                  props.setCancelModal(false), navigation.navigate('Rewards');
                }}>
                <Text style={styles.text_yes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_no}
                onPress={() => props.setCancelModal(false)}>
                <Text style={styles.text_no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CancelPaymentModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    height: '40%',
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
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  big_cancel_icon: {
    fontSize: 100,
    alignSelf: 'center',
    marginBottom: 30,
    color: colors.opens,
  },
  row_btns: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btn_yes: {
    width: '46%',
    height: 45,
    borderRadius:2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bglight,
  },
  text_yes: {
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'uppercase',
    fontSize: fonts.FontHeadding,
    color: colors.black,
  },
  btn_no: {
    width: '46%',
    height: 45,
    borderRadius:2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  text_no: {
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'uppercase',
    fontSize: fonts.FontHeadding,
    color: colors.white,
  },
});
