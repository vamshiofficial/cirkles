import React, {useState} from 'react';
import {
  Dimensions,
  LogBox,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {Toast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import PayingModal from './result_modal';
import ENTER_ESY_PIN from './esy_pin_modal';
import ENTER_AMOUNT from './amount_modal';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PayScanerSheet = props => {
  const navigation = useNavigation();
  // ---
  const [isFlashOn, setisFlashOn] = useState(false);
  const [isFrontCameraOn, setisFrontCameraOn] = useState(false);
  const CameraRotate = () => {
    setisFrontCameraOn(!isFrontCameraOn);
  };
  const FlashOnOff = () => {
    if (!isFrontCameraOn) {
      setisFlashOn(!isFlashOn);
    }
  };
  // ---
  const onSuccess = e => {
    props.setPageLoader(true);
    if (props.Currect_UserId !== null) {
      let text = e.data;
      console.log('scanned data', e.data);
      let result = text.slice(13);
      console.log('the cup id is:', result);
      let cupResult = text.slice(0, 13);
      console.log('the cup res is:', cupResult);
      if (cupResult === 'PAYVAHHCIRCLE') {
        props.EnterAmount(result);
        props.setOutletId(result);
        // props.setPageLoader(false);
      } else {
        alert('invalid qr code', result);
        props.setPageLoader(false);
      }
    } else {
      alert('login first');
    }
  };
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
          onPress={
            () => props.setCancelModal(true)
            // navigation.goBack();
            // props.EnterAmount(2)

            // setRewardModal(true);
            // setisRewardGetting(true);
          }>
          <Ionicons name="close-circle" style={styles.close_sheet_icon} />
        </TouchableOpacity>
        <Text style={styles.topHeding}>
          Scan a QR Code to PAY
        </Text>
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
    <Animatable.View animation={'slideInUp'} duration={500} style={{flex: 1}}>
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
    </Animatable.View>
  );
};

export default PayScanerSheet;
