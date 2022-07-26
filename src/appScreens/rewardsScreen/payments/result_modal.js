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
import * as Animatable from 'react-native-animatable';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PayingModal = props => {
  //header
  // type
  // text
  // props.PayingModalVisible
  return (
    <Animatable.View animation={'slideInUp'} duration={500} style={{flex: 1}}>
      <View
        style={[
          styles.centeredView,
          {
            backgroundColor:
              props.PModalType === 'loading'
                ? colors.bglight
                : props.PModalType === 'success'
                ? colors.green
                : props.PModalType === 'failed'
                ? colors.opens
                : colors.bglight,
          },
        ]}>
        <View style={[styles.modalView]}>
          {props.PModalType === 'loading' ? (
            <ActivityIndicator size={'large'} color={colors.Primary} />
          ) : null}
          <Text style={styles.header_text}>{props.PModalType}</Text>
          <Text style={styles.body_text}>{props.PBodyText}</Text>
          {props.closePayingModal ? (
            <TouchableOpacity
              style={styles.action_btn}
              onPress={props.closePaying}>
              <Text style={styles.action_btn_text}>Okay</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Animatable.View>
  );
};

export default PayingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: DeviceWidth * 0.9,
    marginBottom: DeviceHeight * 0.06,
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
});
