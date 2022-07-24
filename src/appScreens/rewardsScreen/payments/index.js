import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import RESULT_MODAL from './result_modal';
import ENTER_ESY_PIN from './esy_pin_modal';
import ENTER_AMOUNT from './amount_modal';
import PayScanerSheet from './pay_scan';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PaymentsSection = () => {
  // below statuses {SCANNER,AMOUNTMODAL,PINMODAL,RESULTMODAL}
  const [ThePageStatus, setThePageStatus] = useState('SCANNER');
  // -----enter amount modal related
  const [enterAmountModal, setenterAmountModal] = useState(true);
  const [Address, setAddress] = useState('');
  const [ManagerName, setManagerName] = useState('');
  const [PayingAmount, setPayingAmount] = useState(0);
  // -----

  const [closePayingModal, setclosePayingModal] = useState(false);
  // -----
  const [PayingModalVisible, setPayingModalVisible] = useState(true);
  const [PModalType, setPModalType] = useState('loading');
  const [PBodyText, setPBodyText] = useState(
    "Don't press back or close the app.",
  );
  // ------------------------------------------enter amount
  const EnterAmount = __outlet_id => {
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/payments_server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var Data = {
      action: 'GET_OUTLET_INFO',
      outlet_id: __outlet_id,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(resJson => {
        if (resJson !== 'INVALID_TRANSACTION') {
          setThePageStatus('AMOUNTMODAL');
          setAddress(resJson[0].address);
          setManagerName(resJson[0].manager_name);
          console.log(ThePageStatus);
          console.log(Address, resJson[0].address);
          console.log(ManagerName);
        } else {
          alert('error');
        }
      })
      .catch(function (gg) {
        //handle error
        console.log(gg);
      });
  };
  // -----------------------------------------pay this now
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
  return (
    <>
      {ThePageStatus == 'SCANNER' ? (
        <PayScanerSheet EnterAmount={EnterAmount} />
      ) : ThePageStatus == 'AMOUNTMODAL' ? (
        <ENTER_AMOUNT
          visible={enterAmountModal}
          Address={Address}
          ManagerName={ManagerName}
          PayingAmount={PayingAmount}
          setPayingAmount={setPayingAmount}
        />
      ) : ThePageStatus == 'PINMODAL' ? (
        <ENTER_ESY_PIN />
      ) : ThePageStatus == 'RESULTMODAL' ? (
        <RESULT_MODAL
          PayingModalVisible={PayingModalVisible}
          setPayingModalVisible={setPayingModalVisible}
          PBodyText={PBodyText}
          PModalType={PModalType}
          closePaying={closePaying}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>somthing wrong</Text>
        </View>
      )}
    </>
  );
};

export default PaymentsSection;
