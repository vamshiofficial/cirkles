import React, {Component, useEffect, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import RewardGettingSheet from './RewardGettingSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'native-base';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const ScannerSheet = ({navigation}) => {
  // ---
  const [isFlashOn, setisFlashOn] = useState(false);
  const [isFrontCameraOn, setisFrontCameraOn] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  // ---reward modal
  const [isRewardGetting, setisRewardGetting] = useState(true); //default true
  const [RewardModal, setRewardModal] = useState(false); //default false
  const [RewardModalType, setRewardModalType] = useState(''); //default ''
  const [RewardModalMsg, setRewardModalMsg] = useState(''); //default ''
  const [RewardModalAmount, setRewardModalAmount] = useState(0); //default 0
  const [RewardUserName, setRewardUserName] = useState(''); //default ''
  const [PayOutletId, setPayOutletId] = useState(null); //default null
  const [RewardImage, setRewardImage] = useState(
    'https://esigm.com/images/payments/esigm_reward_pages.png',
  );
  // reward statuses (null | QR_INVALID | REWARD_SUCCESS | REWARD_FAILED)
  const [rewardStatus, setrewardStatus] = useState(null);
  //============
  useEffect(() => {
    const GetUserId = async () => {
      let id = '';
      try {
        id = await AsyncStorage.getItem('userToken');
        setCurrect_UserId(id);
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
  }, []);
  //===============
  const onSuccess = e => {
    setrewardStatus(null);
    setisRewardGetting(true);
    setRewardModal(false);
    setRewardModalType('');
    setRewardModalMsg('');
    setRewardModalAmount(0);
    if (Currect_UserId !== null) {
      let text = e.data;
      // console.log('scanned data', e.data);
      let result = text.slice(14);
      // console.log('the cup id is:', result);
      let cupResult = text.slice(0, 14);
      // console.log('the cup res is:', cupResult);
      if (cupResult === 'VAHH_CIRCLE_QR') {
        GetTheReward(result, Currect_UserId);
        // alert('cup scanned please redirect!');
      } else {
        alert('invalid qr code');
      }
    } else {
      alert('login first');
      // Toast.show({
      //   text: 'Wrong password!',
      //   buttonText: 'Okay',
      //   buttonTextStyle: {color: '#008000'},
      //   buttonStyle: {backgroundColor: '#5cb85c'},
      // });
    }
  };

  const GetTheReward = (cup_id, user_id) => {
    setRewardModal(true);
    const CallTheApi = `https://esigm.com/thecircle/v1/rewards.php?action=GetCupReward&user_id=${user_id}&cup_id=${cup_id}`;
    fetch(CallTheApi)
      .then(res => res.json())
      .then(ResultJson => {
        console.log('the returned data', ResultJson);
        if (ResultJson === 'QR_INVALID') {
          setTimeout(() => {
            setisRewardGetting(false);
            setrewardStatus('QR_INVALID');
          }, 5000);
          // show invalid cup message
          // alert('invalid qr code');
        } else if (ResultJson[0].type === 'REWARD_SUCCESS') {
          setTimeout(() => {
            // show success and reward message
            setisRewardGetting(false);
            setPayOutletId(ResultJson[0].outlet_id);
            setrewardStatus(ResultJson[0].type);
            setRewardModalType(ResultJson[0].type);
            setRewardModalMsg(ResultJson[0].message);
            setRewardModalAmount(ResultJson[0].amount);
            setRewardUserName(ResultJson[0].fname);
            setRewardImage(ResultJson[0].reward_image);
          }, 6000);
        } else {
          setTimeout(() => {
            //show somthing went wrong messag
            setisRewardGetting(false);
            setrewardStatus(ResultJson[0].type);
            setRewardModalType(ResultJson[0].type);
            setRewardModalMsg(ResultJson[0].message);
            setRewardModalAmount(ResultJson[0].amount);
          }, 5000);
        }
      });
  };
  const RewardSaveItForLater = () => {
    setRewardModalMsg(
      'Your reward saved to your profile successfully.You can use it whenever you want.',
    );
    setrewardStatus('REWARD_SAVED');
    setRewardModalType('REWARD_SAVED');
    // show message about reward saved to your profile
  };
  const RewardUseNow = () => {
    if (PayOutletId !== null) {
      setRewardModalMsg('');
      setrewardStatus(null);
      setRewardModalType('');
      navigation.navigate('PaymentsSection', {
        GetOutletId: PayOutletId,
        GetPayUserId: null,
      });
    }
  };
  const CameraRotate = () => {
    setisFrontCameraOn(!isFrontCameraOn);
  };
  const FlashOnOff = () => {
    if (!isFrontCameraOn) {
      setisFlashOn(!isFlashOn);
    }
  };
  const ScanAgain = () => {
    setRewardModal(false);
    setisRewardGetting(true);
    setRewardModalType('');
    setRewardModalMsg('');
    setRewardModalAmount(0);
    setRewardUserName('');
  };
  const NavigateHome = () => {
    setRewardModal(false);
    setisRewardGetting(true);
    setRewardModalType('');
    setRewardModalMsg('');
    setRewardModalAmount(0);
    setRewardUserName('');
    navigation.navigate('Home');
  };
  const TopConatiner = () => {
    return (
      <View style={{marginTop: 0}}>
        <Text style={styles.topHeding}>Scan a QR Code</Text>
        <Text style={styles.topText}>
          Please point your camera to the qr code that is presented on a cup.If
          it’s broken or not scanning Enter the below to get your reward.
        </Text>
        {/* <Image
                source={require('../../../assets/images/reward_loading.gif')}
                style={{width:150,height:150}}
              /> */}
        {/* <TouchableOpacity
          onPress={() => {
            GetTheReward('5', 54);
            setRewardModal(true);
            setisRewardGetting(true);
          }}>
          <Text>get my reward</Text>
        </TouchableOpacity> */}
      </View>
    );
  };
  const BottomContainer = () => (
    <View style={styles.btnGrp}>
      <TouchableOpacity style={styles.ActionBtn} onPress={CameraRotate}>
        {isFrontCameraOn ? (
          <Ionicons name={'camera-reverse'} style={styles.CamReverseIcon} />
        ) : (
          <Ionicons
            name={'camera-reverse-outline'}
            style={styles.CamReverseIcon}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.ActionBtn} onPress={FlashOnOff}>
        {isFlashOn ? (
          <Ionicons name={'flash-off-outline'} style={styles.FlashIcon} />
        ) : (
          <Ionicons name={'flash-outline'} style={styles.FlashIcon} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ActionBtn}
        onPress={() =>
          Toast.show({
            text: 'Wrong password!',
            buttonText: 'Okay',
            buttonTextStyle: {color: '#008000'},
            buttonStyle: {backgroundColor: '#5cb85c'},
          })
        }>
        <Ionicons name={'checkmark-outline'} style={styles.SubmitIcon} />
      </TouchableOpacity>
    </View>
  );
  const CustomMarker = () => (
    <View
      style={{
        width: DeviceWidth * 0.55,
        height: DeviceWidth * 0.55,
        borderRadius: 30,
        borderColor: colors.white,
        borderWidth: 3,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    />
  );
  return (
    <View>
      <View style={styles.bottomNavigationView}>
        {RewardModal ? (
          <RewardGettingSheet
            RewardModal={RewardModal}
            setRewardModal={setRewardModal}
            isRewardGetting={isRewardGetting}
            rewardStatus={rewardStatus}
            RewardModalType={RewardModalType}
            RewardModalMsg={RewardModalMsg}
            RewardModalAmount={RewardModalAmount}
            RewardImage={RewardImage}
            Currect_UserId={Currect_UserId}
            fname={RewardUserName}
            navigation={navigation}
            useNow={RewardUseNow}
            useLater={RewardSaveItForLater}
            ScanAgain={ScanAgain}
            NavigateHome={NavigateHome}
          />
        ) : (
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={
              isFlashOn
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            cameraType={isFrontCameraOn ? 'front' : 'back'}
            containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            showMarker={true}
            customMarker={<CustomMarker />}
            topContent={<TopConatiner />}
            topViewStyle={styles.topCon}
            bottomContent={<BottomContainer />}
            bottomViewStyle={styles.bottomCon}
            cameraContainerStyle={styles.cameraContainerStyle}
            cameraStyle={styles.cameraStyle}
            reactivate={true}
            reactivateTimeout={1000}
          />
        )}
      </View>
    </View>
  );
};

export default ScannerSheet;
