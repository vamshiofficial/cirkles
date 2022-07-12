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
import * as Animatable from 'react-native-animatable';
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
        {/* rewardStatus={rewardStatus}
            RewardModalType={RewardModalType}
            RewardModalMsg={RewardModalMsg}
            RewardModalAmount={RewardModalAmount}
            Currect_UserId={Currect_UserId}
            navigation={navigation}
            useNow={RewardUseNow}
            useLater={RewardSaveItForLater} */}
        <View style={styles.centeredView}>
          {props.Currect_UserId !== null ? (
            <View style={styles.modalView}>
              <View style={styles.HeaderSection}>
                {props.isRewardGetting ? (
                  <>
                    <Text style={styles.HedingText}>Getting the result </Text>
                    <Text style={styles.HeaderText}>
                      Please wait while getting your reward.Do not press back or
                      Close the app.
                    </Text>
                  </>
                ) : props.rewardStatus ===
                  'CUP_INVALID' ? null : props.rewardStatus ===
                  'REWARD_SUCCESS' ? (
                  <>
                    <Text style={styles.HedingText}>Success</Text>
                    {/* <Text style={styles.HeaderText}>{}</Text> */}
                  </>
                ) : props.rewardStatus === 'REWARD_FAILED' ? (
                  <>
                    <Text style={styles.HedingText}>Failed</Text>
                  </>
                ) : null}
              </View>
              <View style={styles.BodySection}>
                {props.isRewardGetting ? (
                  <ActivityIndicator size={'large'} color={colors.Primary} />
                ) : props.rewardStatus === 'CUP_INVALID' ? (
                  <Animatable.View animation={'rubberBand'} style={{alignItems:'center'}}>
                    <Text style={styles.HedingText}>Invalid cup</Text>
                    <Text style={styles.HeaderText}>
                      The cup you just scanned was Invalid/Already used/Broken.
                    </Text>
                    <Image
                      source={{
                        uri: 'https://www.pngall.com/wp-content/uploads/5/Red-Party-Cup-PNG-File.png',
                      }}
                      style={{width: 180, height: 250, alignSelf: 'center'}}
                    />
                  </Animatable.View>
                ) : props.rewardStatus === 'REWARD_SUCCESS' ? (
                  <Animatable.View style={styles.cleb_con} animation="bounce">
                    <Image
                      source={{
                        uri: 'https://static.wixstatic.com/media/4f259b_235e03e782444e2d894ead8ab0f37ab1~mv2.gif',
                      }}
                      style={styles.cleb_image}
                    />
                    <Text style={styles.cleb_heding}>
                      {props.RewardModalAmount}
                    </Text>
                    <Text style={styles.cleb_not_text}>
                      {props.RewardModalMsg}
                    </Text>
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
                  </Animatable.View>
                ) : props.rewardStatus === 'REWARD_FAILED' ? (
                  <>
                    <Text>{props.RewardModalMsg}</Text>
                  </>
                ) : null}
              </View>
            </View>
          ) : (
            <View style={styles.without_login_con}>
              <UserLoginImg
                width={DeviceWidth * 0.4}
                height={DeviceWidth * 0.4}
              />
              <Text style={styles.without_login_text}>
                Please login to scan and view your reward. It's less than a
                minute process.
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
