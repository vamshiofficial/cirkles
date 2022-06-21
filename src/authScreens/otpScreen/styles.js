import {StyleSheet,Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
 const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: DeviceWidth*0.13,
    height: DeviceWidth*0.13,
    borderWidth: 1,
    alignItems:'center'
    // borderBottomWidth: 0,
  },

  underlineStyleHighLighted: {
    borderColor: colors.PrimaryBlack,
  },
  centeredView: {
    // width: '100%',
    // height: '100%',
    flex:1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  incorrectOtpText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.red,
  },
  // ================auto verify
  autoVerifyCon:{
  flexDirection:'row',
  // justifyContent:'center',
  // alignSelf:'flex-start',
  marginHorizontal:25,
  justifyContent:'center'
  },
autoVerifyText:{
  fontFamily: fonts.PrimaryBoldFont,
  fontSize: fonts.FontSmall,
  color: colors.black,
  marginLeft:5
},
// ===============resend otp
resendOtpCon:{
flexDirection:'row',
width:'75%',
justifyContent:'space-between',
marginTop:30,
},
changeNumBtn:{
paddingHorizontal:10,
paddingVertical:6,
backgroundColor:colors.bglight,
borderRadius:3
},
changeNumText:{
  fontFamily: fonts.PrimaryBoldFont,
  fontSize: fonts.FontBody,
  color: colors.PrimaryBlack,
},
resendBtn:{
  paddingHorizontal:10,
  paddingVertical:6,
  backgroundColor:colors.bglight,
  borderRadius:3
},
resendText:{
  fontFamily: fonts.PrimaryBoldFont,
  fontSize: fonts.FontBody,
  color: colors.PrimaryBlack,
},
  // =============bottom sheet styles
  bottomNavigationView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // height: DeviceHeight *0.90,
    // maxHeight: DeviceHeight,
    // alignItems:'center'
    // paddingBottom: 30,
    flex:1
  },
  HeaderSection: {
    // height: DeviceHeight * 0.3,
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
    alignItems:'center',
    // marginTop: -35,
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
});
export default styles
