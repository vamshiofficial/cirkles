import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const OurAlert = () => {
  return (
    <Animatable.View style={styles.main_con} animation="slideInUp">
      <View style={styles.con}>
        <View style={styles.item__left}>
          <Ionicons name="checkmark" style={styles.item__icon} />
        </View>
        <View style={styles.item__right}>
          <Text style={styles.item__heding}>Visit all our outlets</Text>
          <Text style={styles.item__body}>
            Know how our circle getting bigger. If you can't find by near
            you.You can be the part of Vahh family.
          </Text>
        </View>
        <View style={styles.item__right_con}>
          <Text>*</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

export default OurAlert;

const styles = StyleSheet.create({
  // =======================home items
  main_con: {},
  con: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    zIndex:10,
    // paddingBottom:0,
    // marginBottom:0,
    width: DeviceWidth,
    backgroundColor: colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    // padding: 15,
    borderWidth: 0,
    borderColor: colors.white,
    marginTop: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 0,
  },
  item__left: {
    width: DeviceWidth * 0.15,
    height: '100%',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  item__icon: {
    fontSize: 28,
    color: colors.black,
  },
  item__right: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    width: DeviceWidth * 0.85,
    backgroundColor: colors.white,
  },
  item__heding: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
  },
  item__body: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
  },
  item__right_con: {
    width: DeviceWidth * 0.1,
    height: '100%',
    backgroundColor: colors.bglight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
});
