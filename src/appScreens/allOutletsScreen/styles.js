import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  con: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    backgroundColor: colors.Primary,
    // paddingTop: 20,
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
  Title_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.black,
  },
  backIcon: {
    fontSize: 25,
    color: colors.black,
  },
  //   -------card styles
  card: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginTop: 25,
  },
  main_img: {
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
  },
  outlet_title: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
  },
  location_con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location_icon: {
    fontSize: 15,
  },
  outlet_location_title: {
    fontFamily: fonts.PrimarySemiBoldFont,
  },
  // ------list item
  list_item: {
    width: DeviceWidth * 0.85,
    borderBottomWidth: 0,
  },
  icon_style: {
    fontSize: 18,
  },
  main_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.white5,
  },
  right_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black,
  },
  details_btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.Primary,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  details_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontBody,
    color: colors.black,
  },
});
export default styles;
