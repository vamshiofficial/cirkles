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
import PayingModal from './result_modal';
import ENTER_ESY_PIN from './esy_pin_modal';
import ENTER_AMOUNT from './amount_modal';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PaymentsSection = () => {
     // below statuses {SCANNER,AMOUNTMODAL,PINMODAL,RESULTMODAL}
    const [ThePageStatus, setThePageStatus] = useState('AMOUNTMODAL')
    
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

  return (
    <View style={{flex: 1}}>
      {
      ThePageStatus === 'SCANNER' ?
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
        :
        ThePageStatus === 'AMOUNTMODAL' ?
        <ENTER_AMOUNT 
        />
        :
        ThePageStatus === 'PINMODAL' ?
        <ENTER_ESY_PIN 
        />
        :
        ThePageStatus === 'RESULTMODAL' ? 
        <PayingModal
          PayingModalVisible={PayingModalVisible}
          setPayingModalVisible={setPayingModalVisible}
          PBodyText={PBodyText}
          PModalType={PModalType}
          closePayingModal={closePayingModal}
          closePaying={closePaying}
        />
      : 
      null
      }
    </View>
  )
}

export default PaymentsSection