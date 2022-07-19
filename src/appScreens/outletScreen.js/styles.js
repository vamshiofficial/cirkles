import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
//----
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  con: {
    height: '100%',
    backgroundColor: colors.white,
  },
  mainBgImg: {
    width: DeviceWidth,
    height: DeviceHeight * 0.25,
    backgroundColor: colors.bglight,
  },
  topBtnGrp: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 45,
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginTop: -22.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    borderRadius: 25,
    elevation: 3,
  },
  topBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '22%',
  },
  TopBtnIcon: {
    fontSize: 15,
    color: colors.directs,
  },
  topBtnRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    borderRadius: 25,
    elevation: 3,
  },
  TopRatingBtnIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  RatingCount: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
  },
  // -----about outlet
  aboutOutletCon: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    marginVertical: 25,
    borderBottomColor: colors.bglight,
    borderBottomWidth: 2,
    paddingBottom: 25,
  },
  OutletName: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
    marginBottom: 5,
  },
  aboutOutlet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutOutletIcon: {
    fontSize: 17,
    marginRight: 10,
  },
  aboutOutletText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
  },
  // ---
  feedbackHeding: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    marginLeft: '5%',
  },
  menuBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 7,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 15,
    marginRight: 10,
  },
  menuText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
  },
  feedbacks_sec: {
    width: DeviceWidth * 0.9,
  },
  feedback_form: {
    // alignSelf: 'center',
    width: DeviceWidth * 0.9,
    // backgroundColor:'red',
    marginLeft: '0%',
    borderBottomColor: colors.white,
    // marginVertical: 15,
    borderTopColor: colors.bglight,
    borderTopWidth: 2,
    paddingVertical:25,
    marginTop: 15,
  },
  comment_icon_con: {
    width: 40,
    height: 40,
    backgroundColor: colors.bglight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
  },
  comment_icon: {
    fontSize: 18,
    marginBottom: -5,
  },
  comment_text: {
    fontFamily: fonts.PrimaryFont,
    paddingLeft: 5,
    // height:100
  },
  // --
  send_feedback_con:{
// backgroundColor:colors.red,
width:DeviceWidth*0.9
  },
  send_feedback: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: colors.Primary,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
  },
  feedback_submit_text: {
    fontFamily: fonts.PrimaryBoldFont,
    paddingRight: 10,
    color:colors.black,
    textTransform:'uppercase'
  },
  feedback_submit_icon: {},
  // no comments
  empty_con: {
    // backgroundColor:colors.bglight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    borderTopColor: colors.bglight,
    borderTopWidth: 2,
    marginTop: 25,
    color:colors.black,
  },
  empty_only_text: {
    fontFamily: fonts.PrimaryFont,
  },
  // ======flat list footer
  footer_con: {
    paddingVertical: 25,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer_text: {
    fontFamily: fonts.PrimaryFont,
  },
  // ====== bottom sheet
  FeedForm_centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  FeedForm_modalView: {
    // margin: 20,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal:15,
    paddingVertical:20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  add_feed_heding: {
    fontFamily: fonts.PrimaryBoldFont,
    textAlign: 'left',
    width: '90%',
    textTransform: 'uppercase',
    color:colors.black
  },
  // HeaderSection: {
  //   backgroundColor: colors.Primary,
  //   paddingTop: 50,

  // },
  // body:{
  //   height:'100%',
  //   backgroundColor:colors.white,
  //   borderTopLeftRadius:35,
  //   borderTopRightRadius:35,
  //   marginTop:-35,
  //   paddingTop:35,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // }
});
export default styles;
