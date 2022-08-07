import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import ListCardUi from '../components/ListCard';
import * as Animatable from 'react-native-animatable';
import QrDataTest from './qrtest';
import {AuthContext} from '../../navigations/context/authContest';
import SubmitBtn from '../components/submitBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Body, Left, ListItem, Right} from 'native-base';
import colors from '../../../assets/custom/colors';
import OurAlert from '../components/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Body, Left, ListItem, Right } from 'native-base';
const HomeScreen = ({navigation}) => {
  const {LogOutNow, LoginNow} = useContext(AuthContext);
  const [UserName, setUserName] = useState('');
  const [UserPic, setUserPic] = useState('');
  const [Wish, setWish] = useState('');
  const [Wish_msg, setWish_msg] = useState('');
  useEffect(() => {
    GetHomeCustoms();
  }, []);
  const GetHomeCustoms = async () => {
    let id = '';
    try {
      id = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    if (id !== null) {
    } else {
    }
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_home_page_customs&user_id=${id}`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setUserName(resJson[0].user_fname);
        setUserPic(resJson[0].user_pic);
        setWish(resJson[0].wish);
        setWish_msg(resJson[0].wish_msg);
      })
      .catch(function (e) {
        console.warn(e);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.con}>
        {/* <OurAlert /> */}
        <Animatable.View
          animation={'bounce'}
          duration={1000}
          style={[styles.HeaderSection, {marginBottom: 10}]}>
          <Text style={styles.HeaderHedding}>
            {UserName} {Wish}
          </Text>
          <Text style={styles.HeaderBody}>{Wish_msg}</Text>
        </Animatable.View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OnBoardingScreen')}>
          <Text>OnBoardingScreen</Text>
        </TouchableOpacity>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={500}>
          <TouchableOpacity
            style={styles.item__con}
            onPress={() => navigation.navigate('AllOutletsScreen')}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="storefront-outline"
                style={styles.item__icon}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Visit all our outlets</Text>
              <Text style={styles.item__body}>
                Know how our circle getting bigger. If you can't find by near
                you.You can be the part of Vahh family.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={800}>
          <TouchableOpacity
            style={styles.item__con}
            onPress={() => navigation.navigate('ScannerScreen')}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                style={[styles.item__icon, {fontSize: 25}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Scan a QR code</Text>
              <Text style={styles.item__body}>
                You can get a absolutly reward when you scan a QR Code with our
                app at our outlets.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={1100}>
          <TouchableOpacity
            style={styles.item__con}
            onPress={() => navigation.navigate('PayOutletScaner')}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="scan-helper"
                style={[styles.item__icon, {fontSize: 20}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Pay at outlet</Text>
              <Text style={styles.item__body}>
                You can directly use your rewards which you won by scaning our
                payment QR code at any VAHH outlets.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={1500}>
          <TouchableOpacity
            style={styles.item__con}
            onPress={() => navigation.navigate('FranchiseRequestScreen')}>
            <View style={[styles.item__left, {backgroundColor: colors.black}]}>
              <MaterialCommunityIcons
                name="store-plus-outline"
                style={[styles.item__icon, {color: colors.white}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Add franchise request</Text>
              <Text style={styles.item__body}>
                If you are intetested in taking our franchise and become insider
                of VAHH family. Please click here we will contact you farther if
                you complete two steps.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        {/* --------------------------------- */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
