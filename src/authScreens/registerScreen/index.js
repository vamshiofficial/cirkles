import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import SubmitBtn from '../../appScreens/components/submitBtn';
import colors from '../../../assets/custom/colors';
import * as Animatable from 'react-native-animatable';
import FullPageLoader from '../../appScreens/components/FullPageLoader';
import ModalView from '../../appScreens/components/modal';
import LoginBtn from '../../appScreens/components/loginBtn';
import Feather from 'react-native-vector-icons/Feather';
const RegisterScreen = ({navigation}) => {
  const [gender, setgender] = useState(null);
  const [ValidationGender, setValidationGender] = useState(false);
  //--
  const [Fname, setFname] = useState('');
  const [FnameErrorText, setFnameErrorText] = useState('');
  const [ValidationFname, setValidationFname] = useState(false);
  //--
  const [Uname, setUname] = useState('');
  const [UnameErrorText, setUnameErrorText] = useState('');
  const [ValidationUname, setValidationUname] = useState(false);
  const [UnameErrorType, setUnameErrorType] = useState('');
  const [LoaderUname, setLoaderUname] = useState(false);
  // --
  const [DOB, setDOB] = useState('');
  const [ValidationDOB, setValidationDOB] = useState(false);
  // --
  const [UserFound, setUserFound] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  // --
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalText, setModalText] = useState('');
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
    // if (Currect_UserId !== null) {
    console.log('user_id', Currect_UserId);
    fetchdata(Currect_UserId);
    // }
  }, []);
  // ================
  const fetchdata = id => {
    setisLoading(true);
    const apiURL =
      `https://esigm.com/thecircle/v1/action.php?action=get_user_information&the_user_id=` +
      id;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        console.log('account details:', resJson);
        if (resJson === 'USER_NOT_FOUND') {
          setUserFound(false);
          setisLoading(false);
        } else {
          setUserData(resJson);
          setUserFound(true);
          setisLoading(false);
          setgender(UserData.gender);
        }
      })
      .catch(function () {
        // CheckTheNetwork()
      });
  };
  // ===============

  const ValidateFname = () => {
    if (Fname == '') {
      setFnameErrorText('name is required');
      setValidationFname(false);
    } else if (Fname.trim().length <= 5) {
      setFnameErrorText('name should have min 5 characters');
      setValidationFname(false);
    } else {
      setFnameErrorText('');
      setValidationFname(true);
    }
  };
  // =============
  const ValidateUname = () => {
    let regSpace = new RegExp(/\s/);
    var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
    setLoaderUname(true);
    if (Uname == '') {
      setUnameErrorText('Username is required');
      setUnameErrorType('fail');
      setValidationUname(false);
      setLoaderUname(false);
    } else if (Uname.trim().length <= 3) {
      setUnameErrorText('Username should have min 4 characters');
      setUnameErrorType('fail');
      setValidationUname(false);
      setLoaderUname(false);
    } else if (regSpace.test(Uname)) {
      setUnameErrorText("Username doesn't takes spaces");
      setUnameErrorType('fail');
      setValidationUname(false);
      setLoaderUname(false);
    } else if (format.test(Uname)) {
      setUnameErrorText(
        "Username doesn't takes Special Characters(Use _ or .)",
      );
      setUnameErrorType('fail');
      setValidationUname(false);
      setLoaderUname(false);
    } else {
      const apiAccountDetails =
        'https://esigm.com/thecircle/v1/action.php?action=chech_the_username_available&input=' +
        Uname;
      fetch(apiAccountDetails)
        .then(res => res.json())
        .then(AccountDetailsJson => {
          // console.log('uname' + AccountDetailsJson);
          if (AccountDetailsJson === false) {
            setUnameErrorType('success');
            setUnameErrorText('');
            setValidationUname(true);
            setLoaderUname(false);
          } else {
            setUnameErrorType('fail');
            setUnameErrorText('Username is not available');
            setLoaderUname(false);
            setValidationUname(false);
          }
        })
        .catch(function (error) {
          // CheckTheNetwork()
          // console.warn('error');
        });
    }
  };
  // ==================
  const SubmitRegisterForm = () => {
    if (
      ValidationGender ||
      ValidationFname ||
      ValidationUname ||
      ValidationGender
    ) {
      var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        action: 'update_account_details',
        update_user: Currect_UserId,
        fname: ValidationFname ? Fname : UserData.fname,
        username: ValidationUname ? Uname : UserData.username,
        gender: gender !== UserData.gender ? gender : UserData.gender,
        bday: ValidationDOB ? DOB : UserData.bday,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(RES => {
          setModalType(RES[0].type);
          setModalText(RES[0].message);
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 5000);
          // if (RES[0].type === 'success') {
          //     setNewFname('')
          //     setNewUname('')
          // }
        });
    }
  };
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <>
          <View style={styles.HeaderSection}>
            <Text style={styles.HedingText}>Basic info</Text>
            <Text style={styles.HeaderText}>
              Please let us know the basic info about you.
            </Text>
          </View>
          <View style={styles.BodySection}>
            {Currect_UserId !== null ? (
              <View style={styles.formCon}>
                <Text style={styles.LableText}>Your good name </Text>
                <TextInput
                  placeholder="Your name"
                  style={styles.mobileInput}
                  defaultValue={UserFound ? UserData.fname : Fname}
                  onChangeText={e => setFname(e)}
                  onBlur={() => ValidateFname()}
                />
                <Text style={styles.LableText}>Username for ESY</Text>
                <Text style={styles.username_intro}>
                  This unique name will be used as your Id in all other
                  platforms that offers by ESY.
                </Text>
                <View style={styles.inputCon}>
                  <TextInput
                    placeholder="Your name"
                    style={styles.mobileInput}
                    defaultValue={UserFound ? UserData.username : Uname}
                    onChangeText={e => setUname(e)}
                    onBlur={() => ValidateUname()}
                  />
                  {LoaderUname ? (
                    ValidationUname ? null : (
                      <View style={{position: 'absolute', right: 10, top: 22}}>
                        <ActivityIndicator
                          animating={true}
                          size="small"
                          style={{opacity: 1}}
                          color={colors.secondary}
                        />
                      </View>
                    )
                  ) : null}
                </View>
                <Animatable.Text
                  animation="lightSpeedIn"
                  duration={500}
                  style={styles.errorText}>
                  {UnameErrorText}
                </Animatable.Text>
                <Text style={styles.LableText}>BirthDay (YYYY-MM-DD)</Text>
                <TextInput
                  placeholder="Date of birth"
                  style={styles.mobileInput}
                  defaultValue={UserFound ? UserData.bday : DOB}
                  onChangeText={e => {
                    setDOB(e), setValidationDOB(true);
                  }}
                />
                <Text style={styles.LableText}>Specify your gender</Text>
                <View style={styles.gendersCon}>
                  <Pressable
                    style={styles.genderBtn}
                    onPress={() => {
                      setgender('Female'), setValidationGender(true);
                    }}>
                    <Image
                      source={{
                        uri: 'https://esigm.com/thecircle/v1/used_images/female.png',
                      }}
                      style={[
                        styles.genderImg,
                        {
                          borderColor:
                            ValidationGender && gender === 'Female'
                              ? colors.PrimaryBlack
                              : UserData.gender === 'Female' &&
                                ValidationGender === false
                              ? colors.PrimaryBlack
                              : colors.bglight,
                        },
                      ]}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.genderBtn}
                    onPress={() => {
                      setgender('Male'), setValidationGender(true);
                    }}>
                    <Image
                      source={{
                        uri: 'https://esigm.com/thecircle/v1/used_images/male.png',
                      }}
                      style={[
                        styles.genderImg,
                        ,
                        {
                          borderColor:
                            ValidationGender && gender === 'Male'
                              ? colors.PrimaryBlack
                              : UserData.gender === 'Male' &&
                                ValidationGender === false
                              ? colors.PrimaryBlack
                              : colors.bglight,
                        },
                      ]}
                    />
                  </Pressable>
                </View>
                <SubmitBtn onPress={() => SubmitRegisterForm()} />
              </View>
            ) : (
              <View style={styles.without_login_con}>
                <Feather name="user" size={150} color={colors.bglight} />
                <Text style={styles.without_login_text}>
                  Please login or Reload the app.
                </Text>
                <LoginBtn onPress={() => navigation.navigate('LoginScreen')} />
              </View>
            )}
            <FullPageLoader visible={isLoading} />
          </View>
          {modalVisible ? (
            <ModalView modalType={modalType} ShowText={modalText} />
          ) : null}
        </>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
