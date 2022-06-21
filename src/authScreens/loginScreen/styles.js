import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: colors.white,
  },
  HeaderSection: {
    height: DeviceHeight * 0.3,
    width: DeviceWidth,
    backgroundColor: colors.white,
    // paddingBottom: 60,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  HedingText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    color: colors.black,
  },
  HeaderText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
  BodySection: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 40,
    marginTop: -35,
    // marginBottom: -35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bg_img: {
    alignSelf: 'center',
    // width:DeviceWidth*0.50,
    // height:DeviceWidth*0.50,
    marginBottom: 50,
  },
  //   --form
  formCon: {
    flexDirection: 'row',
    alignSelf: 'center',
    // position:'absolute',
    // bottom:50
  },
  mobileInput: {
    width: DeviceWidth * 0.85,
    alignSelf: 'center',
    borderColor: colors.bglight,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    fontFamily: fonts.PrimaryFont,
    borderRadius: 5,
    fontSize: fonts.FontBody,
  },
  bottomNavigationView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex:1
    // height: DeviceHeight * 0.60,
    // maxHeight: DeviceHeight,
    // paddingBottom: 30,
  },
});
export default styles;
