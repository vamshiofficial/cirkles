import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RESULT_MODAL from './result_modal';
import ENTER_ESY_PIN from './esy_pin_modal';
import ENTER_AMOUNT from './amount_modal';
import PayScanerSheet from './pay_scan';
import Generate_Pin from '../../settingsScreen/pages/generate_pin';
import CancelPaymentModal from './cancel_payment';
import FullPageLoader from '../../components/FullPageLoader';
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const PaymentsSection = ({route}) => {
  const {GetOutletId, GetPayUserId} = route.params;
  useEffect(() => {
    if (GetOutletId !== null && GetPayUserId === null) {
      EnterAmount(GetOutletId, GetPayUserId, 'Outlet');
      // alert('pay outlet');
    } else if (GetPayUserId !== null && GetOutletId === null) {
      // alert('pay/ share user');
      EnterAmount(GetOutletId, GetPayUserId, 'User');
    } else {
      alert('somthing big wrong');
    }
  }, [GetOutletId, GetPayUserId]);

  // back press handler
  const [CancelModal, setCancelModal] = useState(false);
  useEffect(() => {
    const backAction = () => {
      setCancelModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //=================== states management
  // all pages
  const [Currect_UserId, setCurrect_UserId] = useState('');
  // below statuses {AMOUNTMODAL,PINMODAL,RESULTMODAL}
  const [ThePageStatus, setThePageStatus] = useState('AMOUNTMODAL');
  // pay scan page related
  // const [OutletId, setOutletId] = useState('');
  // -----enter amount modal related
  const [PageLoader, setPageLoader] = useState(false);
  const [PaymentType, setPaymentType] = useState(null);
  const [ToUserProfileUrl, setToUserProfileUrl] = useState(
    'https://esigm.com/thecircle/v1/used_images/no_user.png',
  );
  const [Address, setAddress] = useState('');
  const [PayingToName, setPayingToName] = useState('');
  const [PayingAmount, setPayingAmount] = useState(0);
  const [PayingAmountError, setPayingAmountError] = useState(false);
  // -----related to esy pin
  const [userPaymentsPin, setuserPaymentsPin] = useState('');
  const [PinInput, setPinInput] = useState('');
  const [PinError, setPinError] = useState(false);
  // --related to new pin
  const [NewPin, setNewPin] = useState('');
  const [NewPinVerify, setNewPinVerify] = useState(null);
  const [OtpNumber, setOtpNumber] = useState('');
  const [OtpNumberVerify, setOtpNumberVerify] = useState(null);
  const [GeneratePinModal, setGeneratePinModal] = useState(false);
  const [PinCreateSucess, setPinCreateSucess] = useState(false);
  // -----
  const [isPaying, setisPaying] = useState(false);
  const [PayingModalVisible, setPayingModalVisible] = useState(true);
  const [PModalType, setPModalType] = useState('loading');
  const [PBodyText, setPBodyText] = useState(
    "Don't press back or close the app.",
  );
  const [TransId, setTransId] = useState('');
  const [TransTime, setTransTime] = useState('');
  const [TransToUserName, setTransToUserName] = useState('');
  const [TransToUserPic, setTransToUserPic] = useState(
    'https://esigm.com/thecircle/v1/used_images/no_user.png',
  );
  const [TransAmount, setTransAmount] = useState('');
  const [TransDisplayName, setTransDisplayName] = useState('');
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
  const EnteringAmount = e => {
    if (e > 0 && e < 21) {
      setPayingAmountError(false);
      setPayingAmount(e);
    } else {
      setPayingAmountError(true);
    }
  };
  // ------------------------------------------enter amount
  const EnterAmount = async (__outlet_id, __user_id, __pay_type) => {
    setPaymentType(__pay_type);
    setPageLoader(true);
    let id = '';
    try {
      id = await AsyncStorage.getItem('userToken');
      setCurrect_UserId(id);
    } catch (e) {
      console.log(e);
    }
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/payments_server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var Data = {
      action: 'GET_OUTLET_INFO',
      outlet_id: __outlet_id,
      pay_to_user_id: __user_id,
      pay_type: __pay_type,
      user_id: id,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(resJson => {
        // console.log('enter amount data', resJson);
        if (resJson !== 'INVALID_TRANSACTION') {
          if (__pay_type === 'Outlet') {
            setAddress(resJson[0].address);
            setToUserProfileUrl(resJson[0].to_user_profile_pic);
            setPayingToName(resJson[0].to_user_name);
            setuserPaymentsPin(resJson[0].user_pin);
            setPageLoader(false);
          } else if (__pay_type === 'User') {
            setToUserProfileUrl(resJson[0].to_user_profile_pic);
            setPayingToName(resJson[0].to_user_name);
            setuserPaymentsPin(resJson[0].user_pin);
            setPageLoader(false);
          }
        } else {
          alert('error');
        }
      })
      .catch(function (gg) {
        //handle error
        console.log(gg);
      });
  };
  // -----------------------------------------enter pin
  const EnterPayPin = () => {
    setThePageStatus('PINMODAL');
  };
  // -----------------------------------------enter pin
  const CheckPayPinNow = pin => {
    if (userPaymentsPin === pin) {
      PayThisNow(
        GetOutletId,
        GetPayUserId,
        PaymentType,
        Currect_UserId,
        PayingAmount,
      );
    } else {
      // alert('not matched pin');
      setPinError(true);
    }
  };
  // ----------------------------------------generate new pin
  const GenerateThePin = async () => {
    let ThisMobile = '';
    try {
      ThisMobile = await AsyncStorage.getItem('userMobile');
      setCurrect_UserId(id);
    } catch (e) {
      console.log(e);
    }
    setGeneratePinModal(true);
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var Data = {
      action: 'SEND_OTP_TO_THIS_MOBILE',
      TheMobile: ThisMobile,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(RES => {
        if (RES[0].message !== 'CIRCLE_APP_OTP_FAILED') {
          console.log('retrun message', RES[0].message);
          console.log('retrun otp', RES[0].otp);
          // setGeneratePinModal(false);
          setOtpNumber(RES[0].otp);
        }
      })
      .catch(function (gg) {
        //handle error
        console.log(gg);
      });
  };
  // ---------------------check otp from new pin geneartion
  const CheckOtpNow = num => {
    if (OtpNumber === num) {
      setOtpNumberVerify(true);
    } else {
      setOtpNumberVerify(false);
    }
  };
  const CreateNewPinNow = num => {
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      action: 'Update_user_esy_pin',
      user_id: Currect_UserId,
      new_pin: num,
    };
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(RES => {
        if (RES === 'REQUEST_SUCCESS') {
          setuserPaymentsPin(num);
          setPinCreateSucess(true);
          setTimeout(() => {
            setGeneratePinModal(false);
          }, 2000);
        } else {
          alert('failed');
        }
      })
      .catch(function (gg) {
        console.log(gg);
      });
  };
  // -----------------------------------------pay this now
  const PayThisNow = (
    _outlet_id,
    _pay_to_user_id,
    _payment_type,
    _user_id,
    _amount,
  ) => {
    setisPaying(true);
    setPayingModalVisible(true);
    setThePageStatus('RESULTMODAL');
    var InsertAPIURL = 'https://esigm.com/thecircle/v1/payments_server.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    var Data = {
      action: 'PAY_THIS_NOW',
      outlet_id: _outlet_id,
      to_user_id: _pay_to_user_id,
      payment_type: _payment_type,
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
          // if (RES[0].type == 'success') {
          setPModalType(RES[0].type);
          setPBodyText(RES[0].message);
          setTransId(RES[0].trans_id);
          setTransTime(RES[0].trans_time);
          setTransToUserName(RES[0].to_username);
          setTransToUserPic(RES[0].to_profile_pic);
          setTransAmount(RES[0].amount);
          setTransDisplayName(RES[0].trans_display_name);
          // console.log(JSON.stringify(RES));
          // } else {
          //   setPModalType(RES[0].type), setPBodyText(RES[0].message);
          // }
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
    setPModalType('loading');
    setPBodyText("Don't press back or close the app.");
  };
  return (
    <>
      {
        // ThePageStatus === 'SCANNER' ? (
        //   <PayScanerSheet
        //     Currect_UserId={Currect_UserId}
        //     EnterAmount={EnterAmount}
        //     userPaymentsPin={userPaymentsPin}
        //     setOutletId={setOutletId}
        //     setCancelModal={setCancelModal}
        //     setPageLoader={setPageLoader}
        //   />
        // ) :
        ThePageStatus === 'AMOUNTMODAL' ? (
          <ENTER_AMOUNT
            Address={Address}
            PaymentType={PaymentType}
            PayingToName={PayingToName}
            ToUserProfileUrl={ToUserProfileUrl}
            PayingAmount={PayingAmount}
            // setPayingAmount={setPayingAmount}
            EnteringAmount={EnteringAmount}
            PayingAmountError={PayingAmountError}
            EnterPayPin={EnterPayPin}
            setCancelModal={setCancelModal}
          />
        ) : ThePageStatus === 'PINMODAL' ? (
          <ENTER_ESY_PIN
            PinInput={PinInput}
            setPinInput={setPinInput}
            CheckPayPinNow={CheckPayPinNow}
            GenerateThePin={GenerateThePin}
            setCancelModal={setCancelModal}
            PinError={PinError}
          />
        ) : ThePageStatus === 'RESULTMODAL' ? (
          <RESULT_MODAL
            PayingModalVisible={PayingModalVisible}
            setPayingModalVisible={setPayingModalVisible}
            PBodyText={PBodyText}
            PModalType={PModalType}
            closePaying={closePaying}
            TransId={TransId}
            TransTime={TransTime}
            TransToUserName={TransToUserName}
            TransToUserPic={TransToUserPic}
            TransAmount={TransAmount}
            TransDisplayName={TransDisplayName}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>somthing wrong</Text>
          </View>
        )
      }
      <Generate_Pin
        OtpNumber={OtpNumber}
        setOtpNumber={setOtpNumber}
        GeneratePinModal={GeneratePinModal}
        setGeneratePinModal={setGeneratePinModal}
        CheckOtpNow={CheckOtpNow}
        CreateNewPinNow={CreateNewPinNow}
        OtpNumberVerify={OtpNumberVerify}
        PinCreateSucess={PinCreateSucess}
      />
      <CancelPaymentModal
        CancelModal={CancelModal}
        setCancelModal={setCancelModal}
      />
      <FullPageLoader
        visible={PageLoader}
        bigtext={'Please wait a sec'}
        // text={'Please wait a sec'}
      />
    </>
  );
};

export default PaymentsSection;
