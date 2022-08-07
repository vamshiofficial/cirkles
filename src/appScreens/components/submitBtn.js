import React from 'react';
import {StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import Octicons from 'react-native-vector-icons/Octicons';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const SubmitBtn = (props) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={props.onPress}>
      <Octicons name="check" style={styles.submitIcon} />
    </TouchableOpacity>
  );
};

export default SubmitBtn;

const styles = StyleSheet.create({
  submitBtn: {
    position: 'absolute',
    // position:'relative',
    right: DeviceWidth * 0.075,
    bottom: DeviceWidth * 0.075,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.PrimaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitIcon: {
    fontSize: 30,
    color: colors.white,
  },
});
