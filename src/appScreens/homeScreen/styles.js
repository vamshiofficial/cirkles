import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  con: {
    // flex: 1,
    backgroundColor: colors.white,
  },
  HeaderSection: {
    backgroundColor: colors.Primary,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },
  HeaderHedding: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
    color:colors.black
  },
  HeaderBody: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontBody,
    color: colors.black2,
  },
  // =======================home items
  item__con: {
    width: DeviceWidth * 0.9,
    backgroundColor: colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 15,
    borderWidth:1,
    borderColor:colors.white1,
    borderRadius:5,
    marginVertical:10,
  },
  item__left: {
    width: 55,
    height: 55,
    backgroundColor: colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
  },
  item__icon: {
    fontSize: 28,
    color:colors.black
  },
  item__right: {
    paddingLeft: 20,
    flex:1
  },
  item__heding: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
  },
  item__body: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
  },
});
export default styles;
