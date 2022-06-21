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
    marginBottom: 65,
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
  },
  FlashIcon: {
    fontSize: 20,
  },
  SubmitIcon: {
    fontSize: 20,
  },
});
export default styles
