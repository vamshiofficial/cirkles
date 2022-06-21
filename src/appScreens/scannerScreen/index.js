import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../../../assets/custom/colors'
import fonts from '../../../assets/custom/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const ScannerSheet = props => {
  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    let text = e.data;
    console.log('scanned data',e.data);
    let result = text.slice(9);
    console.log('the cup id is:' ,result);
    let cupResult = text.slice(0, 9);
    console.log('the cup res is:' ,cupResult);
    if(cupResult === 'CIRCLECUP'){
      alert('cup scanned please redirect!')
    }
    else{
      alert('invalid qr code')
    }
  };
  const CameraRotate = () => {
    RNCamera.Constants.FlashMode.on
  }
  const FlashOnOff = () => {

  }
  const TopConatiner = () => {
    return (
      <View style={{marginTop: 0}}>
        {/* <TouchableOpacity style={styles.CloseSheet} onPress={() => props.setVisible(false)}>
          <Ionicons name="close-outline" style={styles.closeIcon} />
        </TouchableOpacity> */}
        <Text style={styles.topHeding}>Scan a QR Code</Text>
        <Text style={styles.topText}>
          Please point your camera to the qr code that is presented on a cup.If
          it’s broken or not scanning Enter the below to get your reward.
        </Text>
      </View>
    );
  };
  const BottomContainer = () => (
    <View style={styles.btnGrp}>
      <TouchableOpacity style={styles.ActionBtn} onPress={()=>CameraRotate()}>
        <Ionicons
          name={'camera-reverse-outline'}
          style={styles.CamReverseIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ActionBtn} onPress={FlashOnOff}>
        <Ionicons name={'flash-outline'} style={styles.FlashIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ActionBtn}>
        <Ionicons name={'checkmark-outline'} style={styles.SubmitIcon} />
      </TouchableOpacity>
    </View>
  );
  const CustomMarker = () => (
    <View
      style={{
        width: DeviceWidth * 0.55,
        height: DeviceWidth * 0.55,
        borderRadius: 20,
        borderColor: colors.white,
        borderWidth: 5,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    />
  );

  return (
    <View>
       {/* <BottomSheet
        visible={props.visible}
        onBackButtonPress={() => props.setVisible(false)}
        onBackdropPress={() => props.setVisible(false)}
         > */}
        <View style={styles.bottomNavigationView}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
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
      </View>
    {/* </BottomSheet>  */}
    </View>
  );
};

export default ScannerSheet;