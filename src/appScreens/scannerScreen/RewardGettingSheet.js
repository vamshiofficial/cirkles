import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
// import styles from './styles';
import colors from '../../../assets/custom/colors';
import LoginBtn from '../components/loginBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserLoginImg from '../../../assets/images/login.svg';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import fonts from '../../../assets/custom/fonts';
import {useNavigation} from '@react-navigation/native';
const RewardGettingSheet = props => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.RewardModal}
      onRequestClose={() => {
        props.setRewardModal(!props.RewardModal);
      }}>
      <Animatable.View style={styles.main_con}>
        {props.isRewardGetting ? (
          //=============loader
          <View style={styles.the__con}>
            <View style={styles.the__top_section}>
              <Text style={styles.the__heading_text}>Getting the result</Text>
              <Text style={styles.the__body_text}>Please wait..</Text>
            </View>
            <View style={styles.the__body_section}>
              <Image
                source={require('../../../assets/images/reward_loading.gif')}
                style={styles.the_gif_image}
              />
            </View>
            <View style={styles.the__footer}>
              <Text style={styles.the__footer_text}>
                Don’t press back or close the app
              </Text>
            </View>
          </View>
        ) : props.rewardStatus === 'REWARD_SUCCESS' ? (
          //=============success pop up
          <View style={styles.the__con}>
            <View style={styles.the__top_section}>
              <Text style={[styles.the__heading_text, {color: colors.green}]}>
                VAHH, {props.fname}
              </Text>
              <Text
                style={[
                  styles.the__body_text,
                  {color: colors.green, fontSize: 16},
                ]}>
                Congratulations
              </Text>
            </View>
            <View style={styles.the__body_section}>
              <Animatable.View
                style={styles.the_reward_image_bg}
                animation="zoomIn"
                duration={1000}
                iterationCount={10}
                iterationDelay={500}
              />
              <View style={styles.the_reward_image_con}>
                <Image
                  source={{
                    uri: props.RewardImage,
                  }}
                  style={styles.the_reward_image}
                />
              </View>
            </View>
            <View style={[styles.the__footer, styles.success_footer]}>
              <View style={styles.cleb_btns}>
                <TouchableOpacity
                  style={styles.useLaterBtn}
                  onPress={() => props.useLater()}>
                  <Text style={styles.useLaterBtnText}>Use Later</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.usenowBtn}
                  onPress={() => props.useNow()}>
                  <Text style={styles.usenowBtnText}>Use Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : props.rewardStatus === 'QR_INVALID' ? (
          // ==================invalid qr code
          <View style={styles.the__con}>
            <View style={styles.the__top_section} />
            <View style={styles.the__body_section}>
              <Animatable.View
                style={styles.the_error_icon_bg}
                animation="zoomIn"
                duration={1000}
                iterationCount={3}
                iterationDelay={500}>
                <Ionicons name="ios-close-outline" style={styles.error_icon} />
              </Animatable.View>
              <Animatable.View
                animation="fadeIn"
                duration={1000}
                iterationDelay={600}>
                <Text style={[styles.the__heading_text, {color: colors.red}]}>
                  We are sorry!
                </Text>
                <Text
                  style={[
                    styles.the__body_text,
                    {color: colors.white4, fontSize: 16, width: '80%'},
                  ]}>
                  The cup you just scanned was Invalid/Already used/Broken.
                </Text>
              </Animatable.View>
            </View>
            <View style={[styles.the__footer, styles.success_footer]}>
              <View style={styles.cleb_btns}>
                <TouchableOpacity
                  style={styles.useLaterBtn}
                  onPress={props.NavigateHome}>
                  <Text style={styles.useLaterBtnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.usenowBtn}
                  onPress={props.ScanAgain}>
                  <Text style={styles.usenowBtnText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : props.rewardStatus === 'REWARD_FAILED' ? (
          // ==================reward failed
          <View style={styles.the__con}>
            <View style={styles.the__top_section} />
            <View style={styles.the__body_section}>
              <Animatable.View
                style={styles.the_error_icon_bg}
                animation="zoomIn"
                duration={1000}
                iterationCount={3}
                iterationDelay={500}>
                <Ionicons name="ios-close-outline" style={styles.error_icon} />
              </Animatable.View>
              <Text style={[styles.the__heading_text, {color: colors.red}]}>
                We are sorry!
              </Text>
              <Text
                style={[
                  styles.the__body_text,
                  {color: colors.white4, fontSize: 16, width: '80%'},
                ]}>
                {props.RewardModalMsg}
              </Text>
            </View>
            <View style={[styles.the__footer, styles.success_footer]}>
              <View style={styles.cleb_btns}>
                <TouchableOpacity
                  style={styles.useLaterBtn}
                  onPress={props.NavigateHome}>
                  <Text style={styles.useLaterBtnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.usenowBtn}
                  onPress={props.ScanAgain}>
                  <Text style={styles.usenowBtnText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : props.rewardStatus === 'REWARD_SAVED' ? (
          // ==================reward saved to profile
          <View style={styles.the__con}>
            <View style={styles.the__top_section} />
            <View style={styles.the__body_section}>
              <Animatable.View
                style={[
                  styles.the_error_icon_bg,
                  {backgroundColor: colors.white},
                ]}
                animation="zoomIn"
                duration={1000}
                iterationCount={3}
                iterationDelay={500}>
                <Ionicons
                  name="ios-checkmark-done-circle"
                  style={[
                    styles.error_icon,
                    {fontSize: 100, color: colors.green},
                  ]}
                />
              </Animatable.View>
              <Animatable.View
                animation="fadeIn"
                duration={1000}
                style={styles.saved_body}>
                <Text style={[styles.the__heading_text, {color: colors.green}]}>
                  Reward saved!
                </Text>
                <Text
                  style={[
                    styles.the__body_text,
                    {color: colors.white4, fontSize: 16, width: '80%'},
                  ]}>
                  {props.RewardModalMsg}
                </Text>
              </Animatable.View>
            </View>
            <View style={[styles.the__footer, styles.success_footer]}>
              <View style={[styles.cleb_btns, {justifyContent: 'center'}]}>
                <TouchableOpacity
                  style={[styles.useLaterBtn, {backgroundColor: colors.black}]}
                  onPress={props.NavigateHome}>
                  <Text style={[styles.useLaterBtnText, {color: colors.white}]}>
                    Home
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.usenowBtn}
                  onPress={props.ScanAgain}>
                  <Text style={styles.usenowBtnText}>Scan Again</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        ) : null}
      </Animatable.View>
    </Modal>
  );
};

export default RewardGettingSheet;
const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    backgroundColor: 'red',
  },
  the__con: {
    flex: 1,
    backgroundColor: colors.white,
  },
  the__top_section: {
    height: '25%',
    // backgroundColor: colors.white2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  the__heading_text: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontMainHeading,
    textAlign: 'center',
    color: colors.black,
  },
  the__body_text: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
    textAlign: 'center',
    color: colors.white5,
  },
  the__body_section: {
    flex: 1,
    // backgroundColor: colors.white3,
    alignItems: 'center',
  },
  the_gif_image: {
    width: DeviceWidth * 0.7,
    height: DeviceWidth * 0.7,
    alignSelf: 'center',
  },
  the__footer: {
    height: '10%',
    backgroundColor: colors.white1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  the__footer_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    textAlign: 'center',
    color: colors.black2,
  },
  // ---------------------success modal
  success_footer: {
    height: '20%',
    backgroundColor: colors.white,
  },
  the_reward_image_bg: {
    width: DeviceWidth * 0.65,
    height: DeviceWidth * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(72, 201, 176,0.5)',
    borderRadius: DeviceWidth * 0.6,
  },
  the_reward_image_con: {
    width: DeviceWidth * 0.55,
    height: DeviceWidth * 0.55,
    marginTop: -DeviceWidth * 0.6,
    alignSelf: 'center',
    shadowColor: '#000',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  the_reward_image: {
    width: '100%',
    height: '100%',
  },
  // ----------------------invalid cup modal
  the_error_icon_bg: {
    width: DeviceWidth * 0.25,
    height: DeviceWidth * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.red,
    borderRadius: DeviceWidth * 0.6,
    marginBottom: 20,
  },
  error_icon: {
    color: colors.white,
    fontSize: 100,
  },
  // --------------------buttons
  cleb_btns: {
    flexDirection: 'row',
    // backgroundColor:'red',
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 20,
  },
  usenowBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: colors.black,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usenowBtnText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontBody,
    color: colors.white,
    textTransform: 'uppercase',
  },
  useLaterBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: colors.bglight,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  useLaterBtnText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontSubHeadding,
    color: colors.black,
    textTransform: 'uppercase',
  },
  // ---------------------saved
  saved_body: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
