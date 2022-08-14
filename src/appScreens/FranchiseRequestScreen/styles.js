import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  header_bg_img: {
    width: DeviceWidth,
    // height:DeviceHeight*0.25,
    paddingTop: 60,
    paddingBottom: 50,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 15,
    backgroundColor: colors.black,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 10,
  },
  header_heading_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: 23,
    color: colors.white,
  },
  header_text: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white2,
  },
  NoteText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  sub_header: {
    width: '100%',
    marginBottom: 10,
  },
  back_btn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_icon: {
    fontSize: 25,
    color: colors.white,
  },
  // ======
  body_con: {
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    // marginTop:-35,
    // paddingBottom:50,
    // backgroundColor:colors.red,
  },
  formCon: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  mobileInput: {
    borderBottomColor: colors.bglight,
    borderBottomWidth: 2,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 5,
    fontFamily: fonts.PrimaryFont,
    borderRadius: 5,
  },
  changeMobileText: {
    fontFamily: fonts.PrimaryFont,
    marginLeft: 10,
  },
  error_text: {
    fontFamily: fonts.PrimaryFont,
    color: colors.red,
    fontSize: fonts.FontBody,
  },
  LableText: {
    marginTop: 25,
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.black,
    fontSize: fonts.FontSubHeadding,
  },
  locationInput: {
    marginTop: 10,
    paddingHorizontal: 5,
    fontFamily: fonts.PrimaryFont,
    borderRadius: 2,
    borderWidth: 0.5,
    shadowOpacity: 0,
    borderColor: colors.white3,
  },
  ResonsInput: {
    marginTop: 10,
    paddingHorizontal: 5,
    fontFamily: fonts.PrimaryFont,
    borderRadius: 2,
    borderWidth: 0.5,
    shadowOpacity: 0,
    borderColor: colors.white3,
  },
  //   --------
  submit_btn: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 35,
  },
  submit_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.white,
    fontSize: fonts.FontSubHeadding,
  },
  // ==========================
  without_login_con: {
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // marginTop: -35,
  },
  login_f_icon: {
    // marginTop:50,
    fontSize: 80,
    color: colors.bglight,
    marginTop: 50,
  },
  without_login_text: {
    fontSize: fonts.FontBody,
    fontFamily: fonts.PrimaryFont,
    color: colors.black3,
    alignSelf: 'center',
  },
  only_text: {
    fontSize: fonts.FontBody,
    fontFamily: fonts.PrimaryFont,
    color: colors.black,
    alignSelf: 'center',
  },
});
export default styles;
