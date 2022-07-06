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
import styles from './styles';
import colors from '../../../assets/custom/colors';
import LoginBtn from '../components/loginBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserLoginImg from '../../../assets/images/login.svg';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const RewardGettingSheet = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.RewardModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          props.setRewardModal(!props.RewardModal);
        }}>
        <View style={styles.centeredView}>
          {props.Currect_UserId !== null ? (
            <View style={styles.modalView}>
              <View style={styles.HeaderSection}>
                <Text style={styles.HedingText}>Getting the result </Text>
                <Text style={styles.HeaderText}>
                  Please wait while getting your reward.Do not press back or
                  Close the app.
                </Text>
              </View>
              <View style={styles.BodySection}>
                {props.isRewardGetting ? (
                  <ActivityIndicator size={'large'} color={colors.Primary} />
                ) : props.isGotRewarded ? (
                  <View style={styles.cleb_con}>
                    <Image
                      source={{
                        uri: 'https://static.wixstatic.com/media/4f259b_235e03e782444e2d894ead8ab0f37ab1~mv2.gif',
                      }}
                      style={styles.cleb_image}
                    />
                    <Text style={styles.cleb_heding}>Congrats vamshi,</Text>
                    <Text style={styles.cleb_not_text}>
                      Vamshi you have earned free cup. You can use it now or you
                      can save it to your profile.
                    </Text>
                    <View style={styles.cleb_btns}>
                      <TouchableOpacity
                        style={styles.useLaterBtn}
                        onPress={() => props.setRewardModal(false)}>
                        <Text style={styles.useLaterBtnText}>Use Later</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.usenowBtn}>
                        <Text style={styles.usenowBtnText}>Use Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text>Sorry lets hope for the best next time.</Text>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.without_login_con}>
              <UserLoginImg
                width={DeviceWidth * 0.4}
                height={DeviceWidth * 0.4}
              />
              <Text style={styles.without_login_text}>
               Please login to scan and view your reward. It's less than a minute process.
              </Text>
              <LoginBtn
                onPress={() => {
                  props.setRewardModal(false),
                    props.navigation.navigate('LoginScreen');
                }}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default RewardGettingSheet;
