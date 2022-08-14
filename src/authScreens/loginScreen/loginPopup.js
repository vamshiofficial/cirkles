import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../../assets/custom/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../../../assets/custom/fonts';
import LoginBtn from '../../appScreens/components/loginBtn';
import {useNavigation} from '@react-navigation/native';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const LoginFirstModal = props => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.setVisible(false)}>
      <View style={styles.centeredView}>
        <Pressable
          onPress={() => props.setVisible(false)}
          style={styles.Pressable}>
          <View style={styles.modalView}>
            <AntDesign name="login" style={styles.iconCheck} />
            <Text style={styles.heading_text}>Please login to continue</Text>
            <Text style={styles.body_text}>
              You can have lots of fun and get unlimited rewards once you step
              in.
            </Text>
            <LoginBtn onPress={() => navigation.navigate('LoginScreen')} />
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: DeviceWidth,
    height: DeviceHeight,
    // flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  Pressable: {
    width: DeviceWidth,
    height: DeviceHeight,
    // flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: colors.red,
  },
  modalView: {
    width: '100%',
    // height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,
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
  iconCheck: {
    alignSelf: 'center',
    color: colors.green,
    fontSize: 60,
    marginBottom: 25,
  },
  heading_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    color: colors.black,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
  okay_btn: {
    width: DeviceWidth * 0.8,
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 35,
  },
  btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.white,
    fontSize: fonts.FontSubHeadding,
  },
});

export default LoginFirstModal;
