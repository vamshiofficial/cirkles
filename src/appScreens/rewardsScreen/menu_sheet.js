import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {BottomSheet} from 'react-native-btr';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import {Body, Left, List, ListItem, Right} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import imgs from '../../../assets/images/base_64_imgs';
const MenuSheet = props => {
  const navigation = useNavigation();

  const OnShare = async () => {
    const ShareContent = {
      message: 'this is a test message to share.',
      url: imgs.invite_image,
    };
    try {
      const ShareResponse = await Share.open(ShareContent);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={() => props.setVisible(false)}
      onBackdropPress={() => props.setVisible(false)}>
      <View style={styles.bottomMainView}>
        <View style={styles.menuBtn}>
          <Text style={styles.menuText}>MENU</Text>
        </View>
        <TouchableOpacity
          style={styles.top_btn}
          onPress={() => {
            props.setVisible(false), navigation.navigate('TransactionHistroy');
          }}>
          <Octicons name="history" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Transactions history</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.top_btn}
          onPress={() => {
            props.setVisible(false), OnShare();
          }}>
          <Ionicons name="md-arrow-redo-outline" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Invite friend</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </BottomSheet>
  );
};

export default MenuSheet;

const styles = StyleSheet.create({
  bottomMainView: {
    backgroundColor: colors.white,
    paddingBottom: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  menuBtn: {
    height: 50,
    flexDirection: 'row',
    // paddingVertical: 15,
    paddingLeft: 15,
    alignItems: 'center',
    // borderBottomColor:colors.bglight,
    // borderBottomWidth:1,
    // marginBottom: 25,
    backgroundColor: colors.white1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  menuText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
    color: colors.black,
  },
  ListItm: {
    marginLeft: 0,
    marginBottom: 15,
  },
  cardImage: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },
  ItemName: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
  },
  ItemPrice: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
  },
  //   ===============btn
  top_btn_grp: {
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  top_btn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 30,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: colors.white,
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  top_icon: {
    fontSize: 20,
    marginRight: 10,
  },
  top_btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
  },
});
