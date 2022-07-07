import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import colors from '../../../assets/custom/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../../../assets/custom/fonts';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const FranchiseRequestModal = props => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="ios-checkmark-done-circle"
              style={styles.iconCheck}
            />
            <Text style={styles.heading_text}>
              Request posted successfully{' '}
            </Text>
            <Text style={styles.body_text}>
              CYour request has been successfully submitted. You will get a
              phone call to (9505504113) to continue to forther steps.
            </Text>
            <Pressable
              style={styles.okay_btn}
              onPress={() => props.setVisible(false)}>
              <Text style={styles.btn_text}>OKAY</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    // height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconCheck: {
    alignSelf: 'center',
    color: colors.green,
    fontSize: 130,
  },
  heading_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    color: colors.black,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
  okay_btn: {
    width: DeviceWidth * 0.8,
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 35,
  },
  btn_text: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.white,
    fontSize: fonts.FontSubHeadding,
  },
});

export default FranchiseRequestModal;
