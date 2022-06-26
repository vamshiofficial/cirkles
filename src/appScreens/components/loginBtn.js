import React from 'react';
import {StyleSheet, Dimensions,TouchableOpacity, Text} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const LoginBtn = (props) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={props.onPress}>
      <AntDesign name="login" style={styles.submitIcon} />
      <Text style={styles.login_text}>LOGIN NOW</Text>
    </TouchableOpacity>
  );
};

export default LoginBtn;

const styles = StyleSheet.create({
  submitBtn: {
    // position: 'absolute',
    // right: DeviceWidth * 0.075,
    // bottom: DeviceWidth * 0.075,
    flexDirection:'row',
    borderRadius: 30,
    backgroundColor: colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:25,
    paddingVertical:8,
    marginVertical:20
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  submitIcon: {
    fontSize: 20,
    marginRight:10,
    color: colors.black,
  },
  login_text:{
    fontFamily:fonts.PrimaryBoldFont,
    fontSize:fonts.FontBody,
    color:colors.black
  }
});
