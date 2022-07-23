import React, {useState} from 'react';
import {Dimensions, LogBox, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import PayingModal from './payingModal';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PayScanerSheet = () => {
  const navigation = useNavigation();
  const [isPaying, setisPaying] = useState(false);
  // ---
  const [isFlashOn, setisFlashOn] = useState(false);
  const [isFrontCameraOn, setisFrontCameraOn] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  // ---
  const [PayingModalVisible, setPayingModalVisible] = useState(false);
  const [PModalType, setPModalType] = useState('loading');
  const [PBodyText, setPBodyText] = useState(
    "Don't press back or close the app.",
  );
  const [closePayingModal, setclosePayingModal] = useState(false);
  const CameraRotate = () => {
    setisFrontCameraOn(!isFrontCameraOn);
  };
  const FlashOnOff = () => {
    if (!isFrontCameraOn) {
      setisFlashOn(!isFlashOn);
    }
  };
  // ---
  const onSuccess = () => {
    // setrewardStatus(null);
    // setisRewardGetting(true);
    // setRewardModal(false);
    // setRewardModalType('');
    // setRewardModalMsg('');
    // setRewardModalAmount(0);
    if (Currect_UserId !== null) {
      let text = e.data;
      console.log('scanned data', e.data);
      let result = text.slice(9);
      console.log('the cup id is:', result);
      let cupResult = text.slice(0, 13);
      console.log('the cup res is:', cupResult);
      if (cupResult === 'PAYVAHHCIRCLE') {
        PayThisNow(result, Currect_UserId,amount);
        // alert('cup scanned please redirect!');
      } else {
        alert('invalid qr code', result);
      }
    } else {
      alert('login first');
    }
  };
  const PayThisNow = (_outlet_id, _user_id, _amount) => {
    setisPaying(true);
    setPayingModalVisible(true);
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/payments_server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var Data = {
      action: 'PAY_THIS_NOW',
      outlet_id: _outlet_id,
      user_id: _user_id,
      amount: _amount,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(RES => {
        setTimeout(() => {
          setPModalType(RES[0].type),
            setPBodyText(RES[0].message),
            setclosePayingModal(true);
        }, 5000);
      })
      .catch(function (gg) {
        //handle error
        console.log(gg);
      });
  };
  const closePaying = () => {
    setisPaying(false);
    setPayingModalVisible(false);
    setclosePayingModal(false);
    setPModalType('loading');
    setPBodyText("Don't press back or close the app.");
  };
  //  ---
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
  const TopConatiner = () => {
    return (
      <View style={{marginTop: 0}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            // PayThisNow(2, 5017, 5);
            // setRewardModal(true);
            // setisRewardGetting(true);
          }}>
            <Ionicons name='close-circle' style={styles.close_sheet_icon} />
        </TouchableOpacity>
        <Text style={styles.topHeding}>Scan a QR Code to PAY</Text>
        <Text style={styles.topText}>
          Please point your camera to the qr code that is presented in our
          outlet.
        </Text>
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
  return (
    <View style={{flex: 1}}>
      {isPaying ? (
        <PayingModal
          PayingModalVisible={PayingModalVisible}
          setPayingModalVisible={setPayingModalVisible}
          PBodyText={PBodyText}
          PModalType={PModalType}
          closePayingModal={closePayingModal}
          closePaying={closePaying}
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
  );
};

export default PayScanerSheet;
