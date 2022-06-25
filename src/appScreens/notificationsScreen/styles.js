import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
const styles = StyleSheet.create({
  con: {
    height:'100%',
    backgroundColor: colors.white,
  },
  HeaderSection: {
    backgroundColor: colors.Primary,
    paddingTop: 50,
    
  },
  body:{
    flex:1,
    backgroundColor:colors.white,
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    marginTop:-35,
    paddingTop:35,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  only_text:{
    fontSize:fonts.FontSmall,
    fontFamily:fonts.PrimaryFont,
    color:colors.black3,
    alignSelf:'center'
  },
  // =================notification ui
  NTFcon: {
    marginLeft: 0,
    width: '90%',
    // height:'100%',
    alignSelf: 'center',
    // marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bglight,
  },
  profileImage: {
    borderRadius: 13,
    width: 50,
    height: 50,
  },
  time: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSmall,
    color: colors.white5,
  },
  text_con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
  the_user_name_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.black,
    paddingRight: 5,
  },
});
export default styles;
