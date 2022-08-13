import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
// ===========
const styles = StyleSheet.create({
  MainHeaderSectionShadow: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
  MainHeaderSection: {
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    paddingBottom: 15,
    backgroundColor: colors.white,
    // paddingVertical: 15,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bglight,
  },
  Mainhead_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.black,
    fontSize: fonts.FontHeadding,
    marginLeft: 25,
    textTransform: 'uppercase',
  },
  con: {
    height: '100%',
    backgroundColor: colors.white,
  },
  HeaderSection: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingBottom: 25,
    paddingHorizontal: 15,
    marginBottom: 25,
    // paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rewardCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardCountIcon: {
    fontSize: 27,
    color: colors.green,
  },
  rewardCountText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: 30,
    color: colors.green,
    marginLeft: 10,
  },
  rewardfooter: {
    color: colors.white3,
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: 15,
  },
  body: {
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -35,
    paddingTop: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SheetCon: {
    height: '40%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  SheetHeader: {},
  HeaderText: {},
  //   ----
  bottomRightBtnsCon: {
    position: 'absolute',
    bottom: 80,
    right: 15,
  },
  qrScanBtn: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
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
  qrIcon: {
    color: colors.black,
    fontSize: 20,
  },
  shareScanBtn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.PrimaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareIcon: {
    color: colors.white,
    fontSize: 25,
  },
  nomore_rewards: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white5,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  footer_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'center',
    borderColor: colors.white,
    borderRadius: 25,
    borderWidth: 0.9,
  },
  // ======without login
  OnlyHeaderSection: {
    // backgroundColor: colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // paddingBottom: 50,
    paddingHorizontal: 15,
  },
  without_login_con: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: colors.white,
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    marginTop: -6,
  },
  without_login_text: {
    fontSize: fonts.FontBody,
    fontFamily: fonts.PrimaryFont,
    color: colors.black3,
    alignSelf: 'center',
  },
  //   ==========reward card
  bottomNavigationView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: (DeviceHeight * 85) / 100,
    paddingBottom: 30,
  },
  // reward_card: {
  //   backgroundColor: colors.bglight,
  //   width: (DeviceWidth * 50) / 100,
  //   height: (DeviceWidth * 50) / 100,
  //   padding: 2,
  //   justifyContent: 'center',
  // },
  reward_image_bg: {
    width: DeviceWidth / 1.7,
    height: DeviceWidth / 1.7,
    backgroundColor: colors.bglight,
    borderRadius: DeviceWidth / 1.8,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  reward_image: {
    width: DeviceWidth / 2,
    height: DeviceWidth / 2,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 5,
    backgroundColor: colors.white,
  },
  pages_text: {
    textAlign: 'center',
    fontFamily: fonts.PrimaryFont,
    marginVertical: 15,
    color: colors.black,
    fontSize: fonts.FontSubHeadding,
  },
  reward_details: {
    paddingHorizontal: 25,
    borderTopColor: colors.bglight,
    borderTopWidth: 0.5,
    paddingVertical: 20,
  },
  reward_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white5,
    paddingVertical: 5,
  },
  // -----------------
  reward_card: {
    backgroundColor: colors.bglight,
    width: (DeviceWidth * 50) / 100,
    height: (DeviceWidth * 50) / 100,
    padding: 2,
    justifyContent: 'center',
  },
  con: {
    marginLeft: 0,
    width: '95%',
    // height:'100%',
    alignSelf: 'center',
    // marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white1,
    backgroundColor: 'red',
  },
  profileImage: {
    borderRadius: 13,
    width: 60,
    height: 60,
  },
  time: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSmall,
    color: colors.white5,
  },
  messageText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
  // ------
  empty_con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  no_rewards_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
    marginTop: 15,
  },
  // ==== footer
  footer_con: {
    paddingTop: 15,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== top bottons
  top_btn_grp: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  top_btn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.bglight,
    marginTop: 25,
  },
  top_icon: {
    fontSize: 20,
    marginRight: 10,
  },
  top_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
  },
});
export default styles;
