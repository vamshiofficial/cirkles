import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  bottomNavigationView: {
    height: '100%',
    // backgroundColor:'white'
  },
  topCon: {
    backgroundColor: colors.Primary,
    paddingHorizontal: 20,
    borderRadius: 0,
    marginBottom: 50,
    // alignItems:'center'
  },
  topHeding: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
    color: colors.black,
  },
  topText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
  },
  bottomCon: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  CloseSheet: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    marginBottom: 0,
    marginTop: 20,
  },
  closeIcon: {
    fontSize: 20,
  },
  without_login_con: {
    // height: '50%',
    paddingVertical: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -35,
  },
  without_login_text: {
    fontSize: fonts.FontBody,
    fontFamily: fonts.PrimaryFont,
    color: colors.black3,
    alignSelf: 'center',
    marginTop: 25,
  },
  login_image: {
    width: 500,
    height: 500,
    marginVertical: 25,
  },
  // ========qr scanner
  cameraContainerStyle: {
    height: DeviceHeight * 0.55,
  },
  cameraStyle: {
    // height:'50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnGrp: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  ActionBtn: {
    width: 50,
    height: 50,
    backgroundColor: colors.bglight,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  CamReverseIcon: {
    fontSize: 20,
    color: colors.black,
  },
  FlashIcon: {
    fontSize: 20,
    color: colors.black,
  },
  SubmitIcon: {
    fontSize: 20,
    color: colors.black,
  },
  // =========================Reward getting sheet styles
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: DeviceWidth,
    // height: DeviceHeight*0.7,
    backgroundColor: colors.white,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderRadius: 30,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  HeaderSection: {
    // flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    // paddingBottom: 60,
    // paddingVertical: 30,
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
    // flex: 3,
    height: 'auto',
    backgroundColor: colors.white,
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    paddingVertical: 40,
    // marginTop: -35,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderRadius: 0,
    justifyContent: 'center',
  },
  // ===================== celebrations styling
  cleb_con: {
    backgroundColor: colors.red,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  cleb_image: {
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
  },
  cleb_heding: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    color: colors.black,
  },
  cleb_not_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.white5,
  },
});
export default styles;
