import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';

const FullPageLoader = props => {
  return (
    <>
      {props.visible ? (
        <View style={styles.con}>
          <ActivityIndicator size={'large'} color={colors.white} />
          <Text style={styles.bigtext}>
            {props.bigtext !== '' ? props.bigtext : ''}
          </Text>
          <Text style={styles.text}>{props.text !== '' ? props.text : ''}</Text>
        </View>
      ) : null}
    </>
  );
};

export default FullPageLoader;

const styles = StyleSheet.create({
  con: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999999999,
  },
  bigtext: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.white,
    marginTop: 10,
  },
  text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSmall,
    color: colors.white,
    marginTop: 0,
  },
});
